// import * as React from "react";
// import TestRenderer from "react-test-renderer";
import {
  OptionValue,
  ComponentBuilderConfigurationGroup,
  buildConfigurationGroupValue
} from "../component";

describe("ConfigurationGroupEditor", () => {
  test("render", () => {
    const configurationGroupValue: OptionValue = {
      [ComponentBuilderConfigurationGroup.identifier]: buildConfigurationGroupValue(
        ComponentBuilderConfigurationGroup.properties
      )
    };

    console.log(configurationGroupValue);

    expect(configurationGroupValue).toMatchSnapshot();
  });
});
