import { TokenPluralizationBuilder } from "../TokenPluralization";

// // // //

describe("Primatives.TokenPluralization", () => {
    test("works", () => {
        const TokenPluralization = new TokenPluralizationBuilder({
            titleSingular: "User",
        });

        expect(TokenPluralization).toMatchSnapshot();
    });
});
