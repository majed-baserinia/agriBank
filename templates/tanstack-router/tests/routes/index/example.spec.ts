import { test } from "$tests/fixtures/micro";
import { createTestIdSelector } from "$tests/selectors";

test("show text on clicking say hello!", async ({ micro }) => {
	await micro.goto("/");
	const iframe = await micro.iframe();
	await iframe.getByTestId("hello-world").click();
	await iframe.waitForSelector(createTestIdSelector("alerts", { isAgriBankComponent: true }), {
		state: "visible"
	});
});
