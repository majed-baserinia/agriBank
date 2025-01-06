import { expect, test } from "@playwright/test";

test("has title", async ({ page }) => {
	await page.goto("/?Auth=false");
	await expect(page).toHaveTitle("/baran-playground");
});
