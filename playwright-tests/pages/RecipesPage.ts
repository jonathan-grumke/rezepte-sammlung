import { Locator, Page } from "@playwright/test";

export class RecipePage {
    readonly page: Page;
    readonly logoButton: Locator;
    readonly burgerMenuButton: Locator;

    constructor(page: Page){
        this.page = page;
        this.logoButton = page.getByText('Moniques Kochbuch');
        this.burgerMenuButton = page.getByLabel('Menü öffnen');
    }

    async goto(){
        await this.page.goto('/');
    }

    async openSidebarMenu(){
        await this.burgerMenuButton.click();
    }

    async openRecipe(recipeName: string){
        const recipeButton = this.page.locator('.recipe-card').filter({ has: this.page.getByText(recipeName) }).locator('a');
        await recipeButton.click();
    }
}