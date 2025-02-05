import { test } from "$tests/fixtures/micro";
import { createTestIdSelectorForAgriComponent } from "$tests/selectors";

test("show text on clicking say hello!", async ({ micro }) => {
	await micro.goto("/");
	const iframe = await micro.iframe();
	await iframe.getByTestId("hello-world").click();
	await iframe.waitForSelector(createTestIdSelectorForAgriComponent("alerts"), {
		state: "visible"
	});
});
