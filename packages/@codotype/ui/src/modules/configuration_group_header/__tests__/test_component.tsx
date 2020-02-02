import * as React from "react";
import TestRenderer from "react-test-renderer";
import { ConfigurationGroupHeader } from "../component";

describe("ConfigurationGroupHeader", () => {
  test("render", () => {
    const tree = TestRenderer.create(
      <ConfigurationGroupHeader
        title={"My Configuration Group"}
        description={"My Configuration Group Description"}
        moreInfoUrl={"https://codotype.org"}
      />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
