import { defineConfig, devices } from "@playwright/test";
import dotenv from "dotenv";
import path from "path";
import { z } from "zod";

/**
 * Read environment variables from file.
 * https://github.com/motdotla/dotenv
 */
dotenv.config({ path: path.resolve(import.meta.dirname, ".env.integration") });

const envSchema = z.object({
	MICRO_IFRAME_ID: z.string().default("baran-playground-my-id"),
	MICRO_APP_PORT: z.number({ coerce: true }).default(5155),
	MICRO_PLAYGROUND_PORT: z.number({ coerce: true }).default(9090),
	MICRO_USERNAME: z.string(),
	MICRO_PASSWORD: z.string(),
	MICRO_ENV: z.union([z.literal("test"), z.literal("pilot"), z.literal("production")])
});
const parsedEnv = envSchema.parse(process.env);

/**
 * See https://playwright.dev/docs/test-configuration.
 */
export const PLAYGROUND_IFRAME_ID = parsedEnv.MICRO_IFRAME_ID;

export default defineConfig({
	webServer: [
		{
			command: `pnpm baran-playground --port ${parsedEnv.MICRO_PLAYGROUND_PORT}`,
			ignoreHTTPSErrors: true,
			port: 9090
		},
		{
			command: process.env.CI
				? `pnpm run preview --port ${parsedEnv.MICRO_APP_PORT}`
				: `pnpm run dev --port ${parsedEnv.MICRO_APP_PORT}`,
			ignoreHTTPSErrors: true,
			port: 5155
		}
	],
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
		trace: "on-first-retry",
		baseURL: `http://localhost:${parsedEnv.MICRO_PLAYGROUND_PORT}/?ci=true&microIframeId=${PLAYGROUND_IFRAME_ID}&microAppName=__APP_NAME__&microPort=${parsedEnv.MICRO_APP_PORT}&microUsername=${parsedEnv.MICRO_USERNAME}&microPassword=${parsedEnv.MICRO_PASSWORD}&microEnv=${parsedEnv.MICRO_ENV}`
	},

	/* Configure projects for major browsers */
	projects: process.env.CI
		? [
				{
					name: "chromium",
					use: {
						...devices["Desktop Chrome"],
						launchOptions: {
							args: ["--disable-web-security"]
						}
					}
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
