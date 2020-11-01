import { OptionValueInstance } from "./configuration-property";

// // // //

/**
 * ConfigurationValue
 * The value the encapsulates all the user-provided data associated with
 * an Array<ConfigurationGroup> on Plugin.configurationGroups or SchemaEditorConfiguration.configurationGroups
 */
export interface ConfigurationValue {
    [key: string]: OptionValueInstance;
}
