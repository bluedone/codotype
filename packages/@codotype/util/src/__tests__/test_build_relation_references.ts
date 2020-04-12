import {
  buildRelationReferences,
  inflateSchemas,
  inflateSchema,
} from "../inflate";
import { Schema, RelationReference, InflatedSchema } from "@codotype/types";
import { userSchema, movieSchema } from "./test_state";

// // // //

const testCases: [string, Schema, Schema[]][] = [
  ["one word label", userSchema, [userSchema, movieSchema]],
];

describe("/lib/buildRelationReferences.js", () => {
  testCases.forEach((testCase) => {
    test(testCase[0], () => {
      const expectedReferences: RelationReference[] = buildRelationReferences({
        schema: testCase[1],
        schemas: testCase[2],
      });
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
