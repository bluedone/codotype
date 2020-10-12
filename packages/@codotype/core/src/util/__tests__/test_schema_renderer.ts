import { renderSchemaJson } from "../schemaRenderer";
import { testState } from "../../";

// // // //

const { userSchema, movieSchema } = testState;

describe("/src/schemaRenderer", () => {
    it("renders JSON representation correctly", () => {
        const renderedSchema: string = renderSchemaJson({
            schema: movieSchema,
            schemas: [userSchema, movieSchema],
        });
        expect(renderedSchema).toMatchSnapshot();
    });
});
