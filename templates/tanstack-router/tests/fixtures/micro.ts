/* eslint-disable react-hooks/rules-of-hooks */
import { PLAYGROUND_IFRAME_ID } from "$playwright-config";
import { type Page, test as baseTest, expect } from "@playwright/test";

class Micro {
	#page: Page;

	constructor(page: Page) {
		this.#page = page;
	}

	async iframe() {
		await this.#page.waitForSelector(`iframe[data-testid='${PLAYGROUND_IFRAME_ID}']`, {
			state: "visible"
		});
		const frame = this.#page.frame(PLAYGROUND_IFRAME_ID);
		expect(frame).toBeTruthy();
		await frame!.waitForLoadState("domcontentloaded");
		return frame!;
	}

	async goto(path: string) {
		const url = (await this.iframe()).url();
		await (await this.iframe()).goto(new URL(url).origin + path);
	}
}

export const test = baseTest.extend<{ micro: Micro }>({
	micro: async ({ page }, use) => {
		await page.goto("");
		await use(new Micro(page));
	}
});
