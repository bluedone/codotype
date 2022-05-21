import { classify, titleize } from "underscore.string";
import { makeCamelCase } from "./makeCamelCase";

// // // //

/**
 * isPascalCase
 * @param input - the input string being transformed into PascalCase
 */
function isPascalCase(input: string): boolean {
    // Return false if there's any whitespace
    if (input.indexOf(" ") !== -1) {
        return false;
    }

    // Check against camel-case version
    const camelCase = makeCamelCase(input);
    let fromCamelCase = "";
    for (let j = 0; j < camelCase.length; j++) {
        if (j === 0) {
            fromCamelCase += camelCase[j].toUpperCase();
        } else {
            fromCamelCase += camelCase[j];
        }
    }

    // Return if input is equal to fromCamelCase
    return input === fromCamelCase;
}

/**
 * splitInputString
 * Split input string based on capitalization of letters
 * i.e. "FooBar" becomes "Foo Bar"
 */
function splitInputString(input: string): string {
    let split = "";
    for (let j = 0; j < input.length; j++) {
        // If the character is uppercase -> check to see if we add whitespace
        if (input[j] === input[j].toUpperCase()) {
            if (
                (input[j + 1] !== undefined &&
                    input[j + 1] === input[j + 1].toUpperCase()) ||
                (input[j - 1] !== undefined &&
                    input[j - 1] === input[j - 1].toUpperCase())
            ) {
                split += input[j].toUpperCase();
            } else {
                split += " ";
                split += input[j].toUpperCase();
            }
        } else {
            split += input[j];
        }
    }

    return split;
}

/**
 * makePascalCase
 * Accepts string and returns PascalCase version
 * @param input - the input string being transformed into PascalCase
 */
export function makePascalCase(input: string): string {
    // Prevents transformation of `PascalCase` into `Pascalcase`
    if (isPascalCase(input)) {
        return input;
    }

    // return classify(titleize(input));
    return classify(titleize(splitInputString(input)));
}
