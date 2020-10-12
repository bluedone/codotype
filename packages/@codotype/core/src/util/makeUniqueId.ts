import { v4 as uuidv4 } from "uuid";

// // // //

/**
 * makeUniqueId
 * Returns a unique ID for a Codotype entity
 */
export function makeUniqueId(): string {
    return uuidv4();
}
