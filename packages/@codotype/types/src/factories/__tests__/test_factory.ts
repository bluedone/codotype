import { OptionType } from "../../configuration-option-types";
import { ConfigurationGroupPropertyBuilder } from "../ConfigurationGroupProperty";

// // // //

describe("factory", () => {
  test("works", () => {
    const configurationGroupProperty = new ConfigurationGroupPropertyBuilder({
      label: "meh",
      identifier: "meh_value",
      type: OptionType.BOOLEAN
    });

    expect(configurationGroupProperty).toMatchSnapshot();
  });
});
