/* eslint-disable react-hooks/rules-of-hooks */
import { PLAYGROUND_BASE_ARGS, PLAYGROUND_IFRAME_ID } from "$playwright-config";
import { type Page, test as baseTest, expect } from "@playwright/test";

class Micro {
	#page: Page;

	constructor(page: Page) {
		this.#page = page;
	}

	async iframe() {
		const frameLocator = this.#page.frameLocator(`#${PLAYGROUND_IFRAME_ID}`);
		await frameLocator.locator("html").waitFor({
			state: "attached"
		});

		const frame = this.#page.frame(PLAYGROUND_IFRAME_ID);
		expect(frame).not.toBeNull();
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
		await page.goto(`?${PLAYGROUND_BASE_ARGS}`);
		await use(new Micro(page));
	}
});
