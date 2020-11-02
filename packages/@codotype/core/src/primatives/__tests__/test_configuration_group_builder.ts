import { ConfigurationGroupBuilder } from "../ConfigurationGroup";

// // // //

describe("factory", () => {
    test("works", () => {
        const configurationGroup = new ConfigurationGroupBuilder({
            identifier: "api_examples",
            content: {
                label: "API Examples",
                description: "Turn API Examples on/off",
            },
        });

        expect(configurationGroup).toMatchSnapshot();
    });
});
