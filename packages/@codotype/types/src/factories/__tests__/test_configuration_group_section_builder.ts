import { ConfigurationGroupSectionBuilder } from "../ConfigurationGroupSection";

// // // //

describe("factory", () => {
  test("works", () => {
    const configurationGroupSection = new ConfigurationGroupSectionBuilder({
      label: "API Examples",
      identifier: "api_examples",
      description: "Turn API Examples on/off",
    });

    expect(configurationGroupSection).toMatchSnapshot();
  });
});
