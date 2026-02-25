import { test, expect } from '../src/fixtures/test-base';

test.describe('Sauce Demo - Guided Exploration', () => {

    test('Main Purchase Flow - Standard User', async ({ loginPage, inventoryPage, purchaseTask, checkoutPage, page }) => {
        await test.step('Logins with standard user', async () => {
            await loginPage.navigate('/');
            await loginPage.login('standard_user', 'secret_sauce');
            await expect(loginPage.page).toHaveURL(/.*inventory.html/);
        });

        await test.step('Verifies initial inventory state', async () => {
            const totalAvailableProducts = await inventoryPage.getProductCount();
            expect(totalAvailableProducts).toBe(6);
        });

        await test.step('Performs sort by price', async () => {
            await inventoryPage.sortBy('lohi');
            const itemPriceList = await inventoryPage.getItemPrices();
            const rawPriceValues = itemPriceList.map(p => parseFloat(p.replace('$', '')));
            expect(rawPriceValues).toEqual([...rawPriceValues].sort((a, b) => a - b));
        });

        // Delegating complex business logic to Tasks
        await purchaseTask.completesPurchaseWithTwoItems({
            firstName: 'User',
            lastName: 'Test',
            postalCode: '10001'
        });

        await test.step('Validates final purchase confirmation', async () => {
            const message = await checkoutPage.getConfirmationMessage();
            expect(message).toBe('Thank you for your order!');
            await page.screenshot({ path: 'evidence/scenario_successful_purchase.png' });
        });
    });

    test.describe('Login Edge Cases', () => {
        test('Should reject empty credentials', async ({ loginPage }) => {
            await loginPage.navigate('/');
            await loginPage.login('', '');
            await expect(loginPage.page.getByTestId('error')).toHaveText(/.*is required/);
        });

        test('Should reject invalid user', async ({ loginPage }) => {
            await loginPage.navigate('/');
            await loginPage.login('invalid_user', 'wrong_pass');
            await expect(loginPage.page.getByTestId('error')).toContainText('Username and password do not match');
        });
    });

    test('Discovery: Empty Cart Checkout Flow', async ({ loginPage, inventoryPage, cartPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login('standard_user', 'secret_sauce');

        await test.step('Navigates to empty cart', async () => {
            await inventoryPage.goToCart();
            expect(await cartPage.getCartItemsCount()).toBe(0);
        });

        await test.step('Attempts checkout with empty cart', async () => {
            await cartPage.goToCheckout();
            await expect(page).toHaveURL(/.*checkout-step-one.html/);
            test.info().annotations.push({
                type: 'Discovery',
                description: 'The app permits proceeding to checkout with an empty cart.'
            });
            await page.screenshot({ path: 'evidence/issue_checkout_empty_cart.png' });
        });
    });

    test('Discovery: Product Detail Consistency', async ({ loginPage, inventoryPage, page }) => {
        await loginPage.navigate('/');
        await loginPage.login('standard_user', 'secret_sauce');

        const firstProductName = await page.locator('.inventory_item_name').first().textContent();
        await page.locator('.inventory_item_name').first().click();

        const detailName = await page.locator('.inventory_details_name').textContent();
        expect(detailName).toBe(firstProductName);

        await page.locator('[data-test="back-to-products"]').click();
        await expect(page).toHaveURL(/.*inventory.html/);
        await page.screenshot({ path: 'evidence/scenario_product_detail_consistency.png' });
    });
});
