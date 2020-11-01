/**
 * trailingComma
 * Helper function to conditionally add a trailing comma
 * while iterating over an array in a Plugin's template
 * Auto-injected into the EJS runtime
 * @param arr
 * @param index
 */
export function trailingComma(arr: any[], index: number): string {
    if (!arr.length || arr.length - 1 === index) return "";
    return ",";
}
