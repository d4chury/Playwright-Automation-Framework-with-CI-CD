import { BasePage } from './BasePage';

export class CheckoutPage extends BasePage {
    private readonly firstNameInput = this.page.getByTestId('firstName');
    private readonly lastNameInput = this.page.getByTestId('lastName');
    private readonly postalCodeInput = this.page.getByTestId('postalCode');
    private readonly continueButton = this.page.getByTestId('continue');
    private readonly finishButton = this.page.getByTestId('finish');
    private readonly completeHeader = this.page.locator('.complete-header');

    async fillInformation(firstName: string, lastName: string, postalCode: string) {
        await this.firstNameInput.fill(firstName);
        await this.lastNameInput.fill(lastName);
        await this.postalCodeInput.fill(postalCode);
        await this.continueButton.click();
    }

    async finishCheckout() {
        await this.finishButton.click();
    }

    async getConfirmationMessage() {
        return await this.completeHeader.textContent();
    }
}
