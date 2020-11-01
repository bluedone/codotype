import { PluginMetadata } from "../plugin";

// // // //

// All required Plugin fields
const requiredFields: string[] = [
    "identifier",
    "version",
    "identifier",
    "content",
    "homepage",
    "version",
    "codotypeVersion",
    "createdBy",
    "techTags",
    "typeTags",
    "experience",
    "project_path",
    "schemaEditorConfiguration",
    "configurationGroups",
    "exampleProjects",
];

/**
 * validatePlugin
 * Returns an array of { valid: boolean, property: string } objects
 * representing if each required property is present in the Plugin's definition
 * @param params.plugin - The Plgin
 */
export function validatePlugin(params: {
    plugin: PluginMetadata;
}): { property: string; valid: boolean }[] {
    const validations = requiredFields.map((property) => {
        if (params.plugin[property] !== undefined) {
            return { property, valid: true };
        }
        return { property, valid: false };
    });

    // Returns validations
    return validations;
}
