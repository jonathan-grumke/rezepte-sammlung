import { Locator, Page } from "@playwright/test";

export class SidebarPage {
    readonly page: Page;
    readonly sidebar: Locator;
    readonly closeButton: Locator;
    readonly logoutButton: Locator;

    constructor(page: Page) {
        this.page = page;
        this.sidebar = page.locator(".sidebar");
        this.closeButton = page.locator(".burger-button");
        this.logoutButton = page.getByRole("button", { name: "Logout" });
    }

    async closeSidebarMenu() {
        await this.closeButton.click();
    }
}
