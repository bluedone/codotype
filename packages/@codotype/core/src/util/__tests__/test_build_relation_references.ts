import {
    buildRelationReferences,
    inflateSchemas,
    inflateSchema,
} from "../inflate";
import {
    SchemaInput,
    testState,
    RelationReference,
    InflatedSchema,
} from "../../";

const { userSchema, movieSchema } = testState;

// // // //

const testCases: [string, SchemaInput, SchemaInput[]][] = [
    ["basic schemas", userSchema, [userSchema, movieSchema]],
];

describe("/lib/buildRelationReferences.js", () => {
    testCases.forEach((testCase) => {
        test(testCase[0], () => {
            const expectedReferences: RelationReference[] = buildRelationReferences(
                {
                    schema: testCase[1],
                    schemas: testCase[2],
                },
            );
            expect(expectedReferences).toMatchSnapshot();
        });
    });
});

// // // //

describe("/lib/inflateSchema.js", () => {
    testCases.forEach((testCase) => {
        test(testCase[0], () => {
            const expectedSchema: InflatedSchema = inflateSchema({
                schema: userSchema,
                schemas: [userSchema, movieSchema],
            });
            expect(expectedSchema).toMatchSnapshot();
        });
    });
});

// // // //

describe("/lib/inflateSchemas.js", () => {
    testCases.forEach((testCase) => {
        test(testCase[0], () => {
            const expectedSchemas: InflatedSchema[] = inflateSchemas({
                schemas: [userSchema, movieSchema],
            });
            expect(expectedSchemas).toMatchSnapshot();
        });
    });
});
