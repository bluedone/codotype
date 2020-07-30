import { buildTokenCasing } from "../buildTokenCasing";
import { buildTokenPluralization } from "../buildTokenPluralization";
import { TokenCasing, TokenPluralization } from "../../";

// // // //

const testCases: [string, string, TokenCasing][] = [
  [
    "one word label",
    "User",
    {
      label: "User",
      snake: "user",
      camel: "user",
      pascal: "User",
      kebab: "user",
    },
  ],
  [
    "two word label",
    "User Registration",
    {
      label: "User Registration",
      snake: "user_registration",
      camel: "userRegistration",
      pascal: "UserRegistration",
      kebab: "user-registration",
    },
  ],
  // ["two word label", "User Registration", "UserRegistration"],
];

describe("/lib/buildTokenCasing.js", () => {
  testCases.forEach((testCase) => {
    test(testCase[0], () => {
      const expectedCasing: TokenCasing = testCase[2];

      const resultCasing: TokenCasing = buildTokenCasing(testCase[1]);

      expect(resultCasing).toStrictEqual(expectedCasing);
    });
  });
});

// // // //

const pluralizedTestCases: [string, string, TokenPluralization][] = [
  [
    "one word label",
    "User",
    {
      singular: {
        label: "User",
        snake: "user",
        camel: "user",
        pascal: "User",
        kebab: "user",
      },
      plural: {
        label: "Users",
        snake: "users",
        camel: "users",
        pascal: "Users",
        kebab: "users",
      },
    },
  ],
  [
    "two word label",
    "User Registration",
    {
      singular: {
        label: "User Registration",
        snake: "user_registration",
        camel: "userRegistration",
        pascal: "UserRegistration",
        kebab: "user-registration",
      },
      plural: {
        label: "User Registrations",
        snake: "user_registrations",
        camel: "userRegistrations",
        pascal: "UserRegistrations",
        kebab: "user-registrations",
      },
    },
  ],
];

describe("/lib/buildTokenPluralization.js", () => {
  pluralizedTestCases.forEach((testCase) => {
    test(testCase[0], () => {
      const expectedCasing: TokenPluralization = testCase[2];

      const resultCasing: TokenPluralization = buildTokenPluralization(
        testCase[1]
      );

      expect(resultCasing).toStrictEqual(expectedCasing);
    });
  });
});
