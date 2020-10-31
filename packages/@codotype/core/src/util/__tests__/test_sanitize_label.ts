import { sanitizeLabel } from "../sanitizeLabel";

// // // //

describe("/lib/sanitizeLabel.js", () => {
    describe("lowercase, two words", () => {
        it("properly titlecased", () => {
            expect(sanitizeLabel("my amazing movie app")).toBe(
                "My Amazing Movie App",
            );
        });
    });

    describe("lowercase with symbols", () => {
        it("symbols should be removed", () => {
            expect(
                sanitizeLabel("movie!@#$%^&*()-_=+[{]}|'\";:<>/?,.~` list"),
            ).toBe("Movie List");
        });
    });

    describe("lowercase with numbers", () => {
        it("numbers should be removed", () => {
            expect(sanitizeLabel("movie 1234567890 list")).toBe("Movie List");
        });
    });

    describe("lowercase with extra whitespace", () => {
        it("extra whitespace should be removed", () => {
            expect(sanitizeLabel("movie   list")).toBe("Movie List");
        });
    });

    describe("lowercase with whitespace between numbers/characters", () => {
        it("trailing whitespace should be removed", () => {
            expect(sanitizeLabel("movie 123")).toBe("Movie ");
        });
    });
});
