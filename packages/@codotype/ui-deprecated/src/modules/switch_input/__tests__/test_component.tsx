import * as React from "react";
import TestRenderer from "react-test-renderer";
import { SwitchInput } from "../component";

describe("SwitchInput", () => {
  test("render", () => {
    const tree = TestRenderer.create(
      <SwitchInput value={true} onChange={jest.fn()} />
    ).toJSON();
    expect(tree).toMatchSnapshot();
  });
});
