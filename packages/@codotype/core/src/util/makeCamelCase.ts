import { makePascalCase } from "./makePascalCase";

// // // //

/**
 * makeCamelCase
 * @param label
 */
export function makeCamelCase(label: string): string {
  const pascalCased = makePascalCase(label);
  return pascalCased.charAt(0).toLowerCase() + pascalCased.slice(1);
}
