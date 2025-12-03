import { test as setup, expect } from "@playwright/test";

const adminFile = "playwright/.auth/admin.json";

setup("authenticate as admin", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Username").fill(process.env.ADMIN_USERNAME);
    await page.getByLabel("Passwort").fill(process.env.ADMIN_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL(process.env.BASE_URL);
    await page.context().storageState({ path: adminFile });
});

const userFile = "playwright/.auth/user.json";

setup("authenticate as user", async ({ page }) => {
    await page.goto("/login");
    await page.getByLabel("Username").fill(process.env.USER_USERNAME);
    await page.getByLabel("Passwort").fill(process.env.USER_PASSWORD);
    await page.getByRole("button", { name: "Login" }).click();
    await page.waitForURL(process.env.BASE_URL);
    await page.context().storageState({ path: userFile });
});
