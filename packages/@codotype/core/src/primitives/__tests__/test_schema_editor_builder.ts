import { SchemaEditorBuilder } from "../SchemaEditor";
import { Datatypes } from "../../datatype";
import { RelationTypes } from "../../relation";

// // // //

describe("factory", () => {
    test("works", () => {
        const schemaEditor = new SchemaEditorBuilder({
            supportedDatatypes: [Datatypes.STRING],
            supportedRelations: [RelationTypes.TO_ONE],
        });

        expect(schemaEditor).toMatchSnapshot();
    });
});
