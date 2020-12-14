/**
 * reorder
 * Function used when reordering Schemas + Attributes + Relations
 * @param list
 * @param startIndex
 * @param endIndex
 */
export function reorder<T>(
    list: T[],
    startIndex: number,
    endIndex: number,
): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}
