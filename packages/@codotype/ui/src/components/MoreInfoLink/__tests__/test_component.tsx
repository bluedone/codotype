import * as React from "react";
import TestRenderer from "react-test-renderer";
import { MoreInfoLink } from "../component";

const testCases: Array<[string, string]> = [
    ["render org", "https://codotype.org"],
]

describe("MoreInfoLink", () => {
    testCases.forEach((testCase) => {
        const [testName, url] = testCase;
        test(testName, () => {
            const tree = TestRenderer.create(
                <MoreInfoLink url={url} />
            ).toJSON();
            expect(tree).toMatchSnapshot();
        });
    })
});
