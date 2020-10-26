import { inflateSchemas, inflateSchema } from "../inflate";
import { SchemaInput, testState, Relation, Schema } from "../../";

const { userSchema, movieSchema } = testState;

// // // //

const testCases: [string, SchemaInput, SchemaInput[]][] = [
    ["basic schemas", userSchema, [userSchema, movieSchema]],
];

// // // //

describe("/lib/inflateSchema.js", () => {
    testCases.forEach(testCase => {
        test(testCase[0], () => {
            const expectedSchema: Schema = inflateSchema({
                schemaInput: userSchema,
                relations: [],
            });
            expect(expectedSchema).toMatchSnapshot();
        });
    });
});

// // // //

describe("/lib/inflateSchemas.js", () => {
    testCases.forEach(testCase => {
        test(testCase[0], () => {
            const expectedSchemas: Schema[] = inflateSchemas({
                schemaInputs: [userSchema, movieSchema],
                relations: [],
            });
            expect(expectedSchemas).toMatchSnapshot();
        });
    });
});
