import { SchemaBuilder } from "../Schema";
import { EMPTY_TOKEN_CASING } from "../../token";

// Mocks UUID module
jest.mock("uuid", () => ({
    __esModule: true,
    v4: () => "1234-5678-1234-5678",
}));

// // // //

describe("factory", () => {
    test("works", () => {
        const schema = new SchemaBuilder({
            attributes: [],
            relations: [],
            identifiers: {
                singular: {
                    ...EMPTY_TOKEN_CASING,
                },
                plural: {
                    ...EMPTY_TOKEN_CASING,
                },
            },
        });

        expect(schema).toMatchSnapshot();
    });
});
