import { defineConfig, devices } from "@playwright/test";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
// import dotenv from 'dotenv';
// import path from 'path';
// dotenv.config({ path: path.resolve(__dirname, '.env') });

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export default defineConfig({
	webServer: {
		command: process.env.CI
			? "pnpm run preview --port 5155"
			: "pnpm run build && pnpm run preview --port 5155",
		ignoreHTTPSErrors: true,
		port: 5155
	},
	testDir: "./tests",
	/* Run tests in files in parallel */
	fullyParallel: true,
	/* Fail the build on CI if you accidentally left test.only in the source code. */
	forbidOnly: !!process.env.CI,
	/* Retry on CI only */
	retries: process.env.CI ? 1 : 0,
	/* Opt out of parallel tests on CI. */
	workers: process.env.CI ? 1 : undefined,
	/* Reporter to use. See https://playwright.dev/docs/test-reporters */
	reporter: process.env.CI ? "dot" : "html",
	testMatch: /(.+\.)?(spec)\.[jt]s/,
	/* Shared settings for all the projects below. See https://playwright.dev/docs/api/class-testoptions. */
	use: {
		testIdAttribute: "data-testid",
		video: process.env.CI ? "off" : "retain-on-failure",
		trace: "on-first-retry"
	},

	/* Configure projects for major browsers */
	projects: process.env.CI
		? [
				{
					name: "chromium",
					use: { ...devices["Desktop Chrome"] }
				}
			]
		: [
				{
					name: "chromium",
					use: { ...devices["Desktop Chrome"] }
				},
				{
					name: "firefox",
					use: { ...devices["Desktop Firefox"] }
				},
				{
					name: "webkit",
					use: { ...devices["Desktop Safari"] }
				},
				{
					name: "Mobile Chrome",
					use: { ...devices["Pixel 5"] }
				},
				{
					name: "Mobile Safari",
					use: { ...devices["iPhone 12"] }
				}
			]
});
