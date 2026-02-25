import { test as base, expect } from '@playwright/test';
import { LoginPage } from '../../pages/LoginPage';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { PurchaseTask } from '../tasks/PurchaseTask';

type MyFixtures = {
    loginPage: LoginPage;
    inventoryPage: InventoryPage;
    cartPage: CartPage;
    checkoutPage: CheckoutPage;
    purchaseTask: PurchaseTask;
};

export const test = base.extend<MyFixtures>({
    loginPage: async ({ page }, use) => {
        await use(new LoginPage(page));
    },
    inventoryPage: async ({ page }, use) => {
        await use(new InventoryPage(page));
    },
    cartPage: async ({ page }, use) => {
        await use(new CartPage(page));
    },
    checkoutPage: async ({ page }, use) => {
        await use(new CheckoutPage(page));
    },
    purchaseTask: async ({ inventoryPage, cartPage, checkoutPage }, use) => {
        // Senior: Inject existing page objects into tasks instead of re-instantiating
        await use(new PurchaseTask(inventoryPage, cartPage, checkoutPage));
    },
});

export { expect };
