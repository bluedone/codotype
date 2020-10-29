import { RelationBuilder } from "../Relation";
import { RelationTypes } from "../../relation";

// Mocks UUID module
jest.mock("uuid", () => ({
    __esModule: true,
    v4: () => "1234-5678-1234-5678",
}));

// // // //

describe("factory", () => {
    test("works", () => {
        const relationBuilder = new RelationBuilder({
            type: RelationTypes.BELONGS_TO,
            sourceSchemaID: "SCHEMA_01",
            destinationSchemaID: "SCHEMA_02",
        });

        expect(relationBuilder).toMatchSnapshot();
    });
});
