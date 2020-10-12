import { sanitizeLabel } from "../sanitizeLabel";
import { makeCamelCase } from "../makeCamelCase";
import { forEach } from "lodash";

// // // //

describe("/lib/sanitizeLabel.js", () => {
    describe("lowercase, two words", () => {
        it("properly titlecased", () => {
            expect(sanitizeLabel("my amazing todo list app")).toBe(
                "My Amazing Todo List App",
            );
        });
    });

    describe("lowercase with symbols", () => {
        it("symbols should be removed", () => {
            expect(
                sanitizeLabel("todo!@#$%^&*()-_=+[{]}|'\";:<>/?,.~` list"),
            ).toBe("Todo List");
        });
    });

    describe("lowercase with numbers", () => {
        it("numbers should be removed", () => {
            expect(sanitizeLabel("todo 1234567890 list")).toBe("Todo List");
        });
    });

    describe("lowercase with extra whitespace", () => {
        it("extra whitespace should be removed", () => {
            expect(sanitizeLabel("todo   list")).toBe("Todo List");
        });
    });

    describe("lowercase with whitespace between numbers/characters", () => {
        it("trailing whitespace should be removed", () => {
            expect(sanitizeLabel("todo 123")).toBe("Todo ");
        });
    });
});

// // // //

const testCases: [string, string][] = [
    ["foo bar", "fooBar"],
    ["fooBar", "fooBar"],
];

describe("makeCamelCase", () => {
    testCases.forEach((testCase) => {
        test(testCase[0], () => {
            expect(makeCamelCase(testCase[0])).toBe(testCase[1]);
        });
    });
});
