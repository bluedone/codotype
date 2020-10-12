import { OptionValueInstance } from "./configuration-option-types";

// // // //

// TODO - this should be renamed to something like, `ConfigurationInput`
// TODO - investigate this accepting a generic type to ensure type-safe enumeration of specific keys
export interface ProjectConfiguration {
    [key: string]: OptionValueInstance;
}
