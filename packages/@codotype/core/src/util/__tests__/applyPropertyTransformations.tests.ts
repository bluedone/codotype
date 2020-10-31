import {
    applyStringPropertyTransformations,
    applyNumberPropertyTransformations,
} from "../applyPropertyTransformations";
import {
    NumberPropertyTransformations,
    StringPropertyTransformations,
} from "../../property-transformation";

// // // //

// testCase = [testName, props.value, props.transformations, expectedResult]
const numberTransformTests: [
    string,
    number,
    NumberPropertyTransformations[],
    number,
][] = [
    [
        "NumberValueFilter.negativeValue",
        -123,
        [NumberPropertyTransformations.negativeValue],
        -123,
    ],
    [
        "NumberValueFilter.positiveValue",
        -123,
        [NumberPropertyTransformations.positiveValue],
        123,
    ],
    [
        "NumberValueFilter.positiveValue 2",
        123.45,
        [NumberPropertyTransformations.positiveValue],
        123.45,
    ],
    [
        "NumberValueFilter.integerValue",
        123.75,
        [NumberPropertyTransformations.integerValue],
        123,
    ],
    [
        "NumberValueFilter.integerValue and NumberValueFilter.negativeValue",
        123.75,
        [
            NumberPropertyTransformations.integerValue,
            NumberPropertyTransformations.negativeValue,
        ],
        -123,
    ],
];

describe("/util/applyPropertyTransformations.ts - numbers", () => {
    numberTransformTests.forEach(
        ([testName, value, transformations, expected]) => {
            test(testName, () => {
                const result: number = applyNumberPropertyTransformations({
                    value,
                    transformations,
                });
                expect(expected).toBe(result);
            });
        },
    );
});

// // // //

// testCase = [testName, props.value, props.transformations, expectedResult]
const stringTransformTests: [
    string,
    string,
    StringPropertyTransformations[],
    string,
][] = [
    [
        "StringValueFilter.lowercase",
        "Hello, Codotype!",
        [StringPropertyTransformations.lowercase],
        "hello, codotype!",
    ],
    [
        "StringValueFilter.uppercase",
        "Hello, Codotype!",
        [StringPropertyTransformations.uppercase],
        "HELLO, CODOTYPE!",
    ],
    [
        "StringValueFilter.titlecase",
        "hello, codotype!",
        [StringPropertyTransformations.titlecase],
        "Hello, Codotype!",
    ],
    [
        "StringValueFilter.camelcase",
        "Hello, codotype!",
        [StringPropertyTransformations.camelcase],
        "helloCodotype",
    ],
    [
        "StringValueFilter.snakecase",
        "Hello, codotype!",
        [StringPropertyTransformations.snakecase],
        "hello,_codotype!",
    ],
    [
        "StringValueFilter.pascalcase",
        "Hello, codotype!",
        [StringPropertyTransformations.pascalcase],
        "HelloCodotype",
    ],
    [
        "StringValueFilter.kebabcase",
        "Hello, codotype 123!",
        [StringPropertyTransformations.kebabcase],
        "hello-codotype-123",
    ],
    [
        "StringValueFilter.nonumbers",
        "Hello 2 codotype! 123",
        [StringPropertyTransformations.nonumbers],
        "Hello  codotype! ",
    ],
    [
        "StringValueFilter.nosymbols",
        "Hello, @#!$",
        [StringPropertyTransformations.nosymbols],
        "Hello ",
    ],
    [
        "StringValueFilter.trimwhitespace",
        "   Hello, Codotype! ",
        [StringPropertyTransformations.trimwhitespace],
        "Hello, Codotype!",
    ],
    [
        "StringValueFilter.removewhitespace",
        "   Hello, Codotype! ",
        [StringPropertyTransformations.removewhitespace],
        "Hello,Codotype!",
    ],
    [
        "combined transformations",
        "   Hello, Codotype! This is like test #123.",
        [
            StringPropertyTransformations.trimwhitespace,
            StringPropertyTransformations.uppercase,
            StringPropertyTransformations.nonumbers,
        ],
        "HELLO, CODOTYPE! THIS IS LIKE TEST #.",
    ],
];

describe("/util/applyPropertyTransformations.ts - strings", () => {
    stringTransformTests.forEach(
        ([testName, value, transformations, expected]) => {
            test(testName, () => {
                const result: string = applyStringPropertyTransformations({
                    value,
                    transformations: transformations,
                });
                expect(result).toBe(expected);
            });
        },
    );
});
