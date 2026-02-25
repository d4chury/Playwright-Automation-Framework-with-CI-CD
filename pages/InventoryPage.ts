import { BasePage } from './BasePage';
import { expect } from '@playwright/test';

export class InventoryPage extends BasePage {
    private readonly catalogProducts = this.page.locator('.inventory_item');
    private readonly shoppingCartCounter = this.page.locator('.shopping_cart_badge');
    private readonly productSortingDropdown = this.page.getByTestId('product-sort-container');
    private readonly menuButton = this.page.locator('#react-burger-menu-btn');
    private readonly logoutLink = this.page.getByTestId('logout-sidebar-link');

    async addItemToCart(index: number = 0) {
        const productItem = this.catalogProducts.nth(index);
        const addProductButton = productItem.locator('button[id^="add-to-cart-"]');
        await addProductButton.click();
    }

    async removeItemFromCart(index: number = 0) {
        const removeProductButton = this.page.locator('button').filter({ hasText: 'Remove' }).nth(index);
        await removeProductButton.click();
    }

    async getFirstAvailableRemoveButton() {
        return this.page.locator('button').filter({ hasText: 'Remove' }).first();
    }

    async getCartBadgeCount() {
        if (await this.shoppingCartCounter.isVisible()) {
            return await this.shoppingCartCounter.textContent();
        }
        return '0';
    }

    async sortBy(sortingCriteria: 'az' | 'za' | 'lohi' | 'hilo') {
        await this.productSortingDropdown.selectOption(sortingCriteria);
    }

    async getItemPrices() {
        return await this.page.locator('.inventory_item_price').allTextContents();
    }

    async getProductCount() {
        return await this.catalogProducts.count();
    }

    async goToCart() {
        await this.page.locator('.shopping_cart_link').click();
    }

    async logout() {
        await this.menuButton.click();
        await this.logoutLink.click();
    }
}
