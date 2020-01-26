import * as React from "react";
import TestRenderer from "react-test-renderer";
import { MoreInfoLink } from "../component";

describe("MoreInfoLink", () => {
  test("render", () => {
    const tree = TestRenderer.create(
      <MoreInfoLink url="https://codotype.org" />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
