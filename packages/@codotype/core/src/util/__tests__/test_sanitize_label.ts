import { sanitizeTitle } from "../sanitizeTitle";

// // // //

describe("/lib/sanitizeTitle.js", () => {
    describe("lowercase, two words", () => {
        it("properly titlecased", () => {
            expect(sanitizeTitle("my amazing movie app")).toBe(
                "My Amazing Movie App",
            );
        });
    });

    describe("lowercase with symbols", () => {
        it("symbols should be removed", () => {
            expect(
                sanitizeTitle("movie!@#$%^&*()-_=+[{]}|'\";:<>/?,.~` list"),
            ).toBe("Movie List");
        });
    });

    describe("lowercase with numbers", () => {
        it("numbers should be removed", () => {
            expect(sanitizeTitle("movie 1234567890 list")).toBe("Movie List");
        });
    });

    describe("lowercase with extra whitespace", () => {
        it("extra whitespace should be removed", () => {
            expect(sanitizeTitle("movie   list")).toBe("Movie List");
        });
    });

    describe("lowercase with whitespace between numbers/characters", () => {
        it("trailing whitespace should be removed", () => {
            expect(sanitizeTitle("movie 123")).toBe("Movie ");
        });
    });
});
