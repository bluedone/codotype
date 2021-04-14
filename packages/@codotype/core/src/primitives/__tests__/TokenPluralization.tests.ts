import { TokenPluralizationBuilder } from "../TokenPluralization";

// // // //

describe("Primitives.TokenPluralization", () => {
    test("works", () => {
        const TokenPluralization = new TokenPluralizationBuilder({
            titleSingular: "User",
        });

        expect(TokenPluralization).toMatchSnapshot();
    });
});
