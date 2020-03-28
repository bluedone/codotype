import { SchemaForm } from "../index";
import { DEFAULT_SCHEMA } from "@codotype/types";
import TestRenderer, { ReactTestRendererJSON } from "react-test-renderer";

// // // //

describe("SchemaForm", () => {
  test("render", () => {
    const renderedComponent: ReactTestRendererJSON | null = TestRenderer.create(
      <SchemaForm schema={{ ...DEFAULT_SCHEMA }} />
    ).toJSON();

    expect(renderedComponent).toMatchSnapshot();
  });
});
