import { test } from '@playwright/test';
import { InventoryPage } from '../../pages/InventoryPage';
import { CartPage } from '../../pages/CartPage';
import { CheckoutPage } from '../../pages/CheckoutPage';
import { CustomerInfo } from '../models/User';

export class PurchaseTask {
    constructor(
        private inventoryPage: InventoryPage,
        private cartPage: CartPage,
        private checkoutPage: CheckoutPage
    ) { }

    /**
     * Encapsulate the multi-page business flow for a purchase.
     * Uses test.step for premium reporting.
     */
    async completesPurchaseWithTwoItems(customer: CustomerInfo) {
        await test.step('Completes purchase flow', async () => {
            await test.step('Adds first two items to cart', async () => {
                await this.inventoryPage.addItemToCart(0);
                await this.inventoryPage.addItemToCart(1);
            });

            await test.step('Proceeds to checkout', async () => {
                await this.inventoryPage.goToCart();
                await this.cartPage.goToCheckout();
            });

            await test.step('Fills customer information and finishes', async () => {
                await this.checkoutPage.fillInformation(customer.firstName, customer.lastName, customer.postalCode);
                await this.checkoutPage.finishCheckout();
            });
        });
    }
}
