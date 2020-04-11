import {
  buildRelationReferences,
  inflateSchemasV2,
  inflateSchemaV2,
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

describe("/lib/inflateSchemaV2.js", () => {
  testCases.forEach((testCase) => {
    test(testCase[0], () => {
      const expectedSchema: InflatedSchema = inflateSchemaV2({
        schema: userSchema,
        schemas: [userSchema, movieSchema],
      });
      expect(expectedSchema).toMatchSnapshot();
    });
  });
});

// // // //

describe("/lib/inflateSchemasV2.js", () => {
  testCases.forEach((testCase) => {
    test(testCase[0], () => {
      const expectedSchemas: InflatedSchema[] = inflateSchemasV2({
        schemas: [userSchema, movieSchema],
      });
      expect(expectedSchemas).toMatchSnapshot();
    });
  });
});
