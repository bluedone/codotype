import { TokenCasingBuilder } from "../TokenCasing";

// // // //

describe("Primatives.TokenCasing", () => {
    test("works", () => {
        const tokenCasing = new TokenCasingBuilder({
            title: "User",
        });

        expect(tokenCasing).toMatchSnapshot();
    });
});
