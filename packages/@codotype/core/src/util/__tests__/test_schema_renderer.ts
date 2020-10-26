import { renderSchemaJson } from "../schemaRenderer";
import { testState } from "../../";
import { Codotype } from "../../codotype";
import { EMPTY_TOKEN_CASING } from "../../token";
import { RelationTypes } from "../../relation";

// // // //

const { userSchema, movieSchema } = testState;

describe("/src/schemaRenderer", () => {
    it("renders JSON representation correctly", () => {
        const renderedSchema: string = renderSchemaJson({
            schemaInput: userSchema,
            projectInput: {
                id: "my-project",
                schemas: [userSchema, movieSchema],
                pluginID: "",
                pluginVersion: "",
                configuration: {},
                relations: [
                    new Codotype.Relation({
                        type: RelationTypes.BELONGS_TO,
                        sourceSchemaID: userSchema.id,
                        destinationSchemaID: movieSchema.id,
                    }),
                ],
                identifiers: {
                    ...EMPTY_TOKEN_CASING,
                },
            },
        });
        expect(renderedSchema).toMatchSnapshot();
    });
});
