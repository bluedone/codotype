import { SchemaEditorBuilder } from "../SchemaEditor";
import { Datatype } from "../../datatype";
import { RelationTypes } from "../../relation";

// // // //

describe("factory", () => {
    test("works", () => {
        const schemaEditor = new SchemaEditorBuilder({
            supportedDatatypes: [Datatype.STRING],
            supportedRelations: [RelationTypes.TO_ONE],
        });

        expect(schemaEditor).toMatchSnapshot();
    });
});
