import { BasePage } from './BasePage';

export class LoginPage extends BasePage {
    private readonly usernameInput = this.page.getByTestId('username');
    private readonly passwordInput = this.page.getByTestId('password');
    private readonly loginButton = this.page.getByTestId('login-button');
    private readonly errorMessage = this.page.getByTestId('error');

    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async getErrorMessage() {
        return await this.errorMessage.textContent();
    }
}
