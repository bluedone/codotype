import { SchemaEditorBuilder } from "../SchemaEditor";
import { Datatype } from "../../datatype";
import { RelationType } from "../../relation";

// // // //

describe("factory", () => {
    test("works", () => {
        const schemaEditor = new SchemaEditorBuilder({
            supportedDatatypes: [Datatype.STRING],
            supportedRelations: [RelationType.TO_ONE],
        });

        expect(schemaEditor).toMatchSnapshot();
    });
});
