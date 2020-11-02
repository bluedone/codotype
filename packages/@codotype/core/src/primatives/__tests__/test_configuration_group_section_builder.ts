import { ConfigurationGroupSectionBuilder } from "../ConfigurationGroupSection";

// // // //

describe("factory", () => {
    test("works", () => {
        const configurationGroupSection = new ConfigurationGroupSectionBuilder({
            identifier: "api_examples",
            content: {
                label: "API Examples",
                description: "Turn API Examples on/off",
            },
        });

        expect(configurationGroupSection).toMatchSnapshot();
    });
});
