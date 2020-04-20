import { renderSchemaJson } from "../schemaRenderer";
import { userSchema, movieSchema } from "./test_state";

// // // //

describe("/src/schemaRenderer", () => {
  it("renders JSON representation correctly", () => {
    const renderedSchema: string = renderSchemaJson({
      schema: movieSchema,
      schemas: [userSchema, movieSchema],
    });
    expect(renderedSchema).toMatchSnapshot();
  });
});
