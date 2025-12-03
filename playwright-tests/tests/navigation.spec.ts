import { expect, test } from "@playwright/test";
import { RecipePage } from "../pages/RecipesPage";
import { SidebarPage } from "../pages/SidebarPage";

test("open landing page and check title", async ({ page }) => {
    const recipePage = new RecipePage(page);
    await recipePage.goto();
    await expect(page).toHaveTitle("Rezepte");
});

test.describe(() => {
    test.use({ storageState: "playwright/.auth/user.json" });

    test("open sidebar and check login status", async ({ page }) => {
        const recipePage = new RecipePage(page);
        const sidebarPage = new SidebarPage(page);
        await recipePage.goto();
        await recipePage.openSidebarMenu();
        await expect(sidebarPage.logoutButton).toBeVisible();
    });
});
