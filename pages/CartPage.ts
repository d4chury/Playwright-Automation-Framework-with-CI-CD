import { BasePage } from './BasePage';

export class CartPage extends BasePage {
    private readonly cartItems = this.page.locator('.cart_item');
    private readonly checkoutButton = this.page.getByTestId('checkout');
    private readonly continueShoppingButton = this.page.getByTestId('continue-shopping');

    async getCartItemsCount() {
        return await this.cartItems.count();
    }

    async removeItem(index: number = 0) {
        await this.cartItems.nth(index).locator('button').filter({ hasText: 'Remove' }).click();
    }

    async goToCheckout() {
        await this.checkoutButton.click();
    }
}
