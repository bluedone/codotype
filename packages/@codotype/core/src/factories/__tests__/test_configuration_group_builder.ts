import { ConfigurationGroupBuilder } from "../ConfigurationGroup";

// // // //

describe("factory", () => {
    test("works", () => {
        const configurationGroup = new ConfigurationGroupBuilder({
            label: "API Examples",
            identifier: "api_examples",
            description: "Turn API Examples on/off",
        });

        expect(configurationGroup).toMatchSnapshot();
    });
});
