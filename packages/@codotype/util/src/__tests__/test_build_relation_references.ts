import { buildRelationReferences } from "../inflate";
import { Schema, RelationReference } from "@codotype/types";
import { userSchema, movieSchema } from "./test_state";

// // // //

// buildRelationReferences({ schema, schemas })

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
