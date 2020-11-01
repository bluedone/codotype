import { makeTitleCase } from "./makeTitleCase";
import { makeKebabCase } from "./makeKebabCase";
import { makePascalCase } from "./makePascalCase";
import { makeCamelCase } from "./makeCamelCase";
import { TokenCasing } from "../";
import { makeSnakeCase } from "./makeSnakeCase";

// // // //

// buildTokenCasing
// Accepts a singlar, titleized, human-readable label
// and produces all requisite metadata for sensible code generation
export function buildTokenCasing(label: string): TokenCasing {
    return {
        title: makeTitleCase(label),
        snake: makeSnakeCase(label),
        camel: makeCamelCase(label),
        pascal: makePascalCase(label),
        kebab: makeKebabCase(label),
    };
}
