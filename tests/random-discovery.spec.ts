import { test, expect } from '../src/fixtures/test-base';
import users from '../data/users.json';

test.describe('Sauce Demo - Random Discovery & Data Driven', () => {

    for (const user of users) {
        test(`Data-Driven validation for ${user.username}`, async ({ loginPage, page }) => {
            await test.step(`Attempts to login as: ${user.username}`, async () => {
                await loginPage.navigate('/');
                await loginPage.login(user.username, user.password);
            });

            await test.step('Verifies the expected result', async () => {
                if (user.expectedBehavior === 'success' || user.expectedBehavior === 'check_images') {
                    await expect(page).toHaveURL(/.*inventory.html/);
                } else {
                    const error = await loginPage.getErrorMessage();
                    expect(error).toContain(user.expectedMessage);
                }
            });
        });
    }

    test('Discovery: Persistence across re-login', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate('/');
        await loginPage.login('standard_user', 'secret_sauce');

        await test.step('Adds item and logouts', async () => {
            await inventoryPage.addItemToCart(0);
            await inventoryPage.logout();
        });

        await test.step('Re-logins and verifies cart state', async () => {
            await loginPage.login('standard_user', 'secret_sauce');
            const activeBadgeCounter = await inventoryPage.getCartBadgeCount();
            test.info().annotations.push({ type: 'Persistence Discovery', description: `Cart badge is ${activeBadgeCounter} after re-login` });
            expect(activeBadgeCounter).toBe('1');
        });
    });

    test('Discovery: Problem User Visual Anomalies', async ({ loginPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login('problem_user', 'secret_sauce');

        await test.step('Audits product images for broken links', async () => {
            const productImageLocators = page.locator('.inventory_item_img img');
            const imageCount = await productImageLocators.count();
            const uniqueImageSourceSet = new Set();

            for (let i = 0; i < imageCount; i++) {
                const imageUrl = await productImageLocators.nth(i).getAttribute('src');
                uniqueImageSourceSet.add(imageUrl);
            }

            // Problem user has the same broken image for every item
            if (uniqueImageSourceSet.size === 1) {
                test.info().annotations.push({
                    type: 'Defect',
                    description: 'Problem user shows the same static 404 image for all products.'
                });
            }

            await page.screenshot({ path: `evidence/discovery_visual_bug_${Date.now()}.png` });
        });
    });

    test('Discovery: Reset App State Functionality', async ({ loginPage, inventoryPage }) => {
        await loginPage.navigate('/');
        await loginPage.login('standard_user', 'secret_sauce');

        await test.step('Add item and then reset state', async () => {
            await inventoryPage.addItemToCart(0);
            expect(await inventoryPage.getCartBadgeCount()).toBe('1');

            // Logic: The reset button is in the side menu
            await inventoryPage.page.locator('#react-burger-menu-btn').click();
            await inventoryPage.page.locator('#reset_sidebar_link').click();

            // Wait for a moment for the reset to take effect
            await inventoryPage.page.waitForTimeout(500);

            expect(await inventoryPage.getCartBadgeCount()).toBe('0');
            console.log('Clean Discovery: Reset App State successfully cleared the cart.');
            await inventoryPage.page.screenshot({ path: 'evidence/scenario_reset_app_state.png' });
        });
    });
});
