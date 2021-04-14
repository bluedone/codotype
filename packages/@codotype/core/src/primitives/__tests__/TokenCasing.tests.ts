import { TokenCasingBuilder } from "../TokenCasing";

// // // //

describe("Primitives.TokenCasing", () => {
    test("works", () => {
        const tokenCasing = new TokenCasingBuilder({
            title: "User",
        });

        expect(tokenCasing).toMatchSnapshot();
    });
});
