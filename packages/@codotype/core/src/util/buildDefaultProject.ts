import {
    SchemaInput,
    ProjectInput,
    PropertyTypes,
    ConfigurationPropertyValue,
    ConfigurationValue,
    ConfigurationPropertyDict,
    ConfigurationGroup,
    ConfigurationGroupSection,
    PluginMetadata,
    ConfigurationProperty,
} from "../";

// // // //

/**
 * buildConfigurationPropertyValue
 * Accepts a single ConfigurationProperty and recursively produces its associated OptionValue instance
 * @param property - the single ConfigurationProperty for which the OptionValue is being produced
 */
export function buildConfigurationPropertyValue(
    property: ConfigurationProperty,
): ConfigurationPropertyValue {
    if (property.type === PropertyTypes.STRING) {
        return property.defaultValue || "";
    }
    if (property.type === PropertyTypes.BOOLEAN) {
        return property.defaultValue || false;
    }
    if (property.type === PropertyTypes.DROPDOWN) {
        return property.defaultValue
            ? property.defaultValue
            : property.selectOptions.length > 0
            ? property.selectOptions[0].value
            : "";
    }
    if (property.type === PropertyTypes.RADIO_GROUP) {
        return property.defaultValue
            ? property.defaultValue
            : property.selectOptions.length > 0
            ? property.selectOptions[0].value
            : "";
    }
    if (property.type === PropertyTypes.COLLECTION) {
        if (Array.isArray(property.defaultValue)) {
            return property.defaultValue;
        }
        // Return empty array as default
        return [];
    }
    if (property.type === PropertyTypes.INSTANCE) {
        return buildValueFromProperties(property.properties);
    }
    return "";
}

/**
 * buildValueFromProperties
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationProperty
 */
export function buildValueFromProperties(
    properties: ConfigurationProperty[],
): ConfigurationPropertyDict {
    const initialValue: ConfigurationPropertyDict = {};

    // Defines empty ConfigurationGroupValue
    // Iterates over each property in the group and assigns values
    const configurationGroupValue: ConfigurationPropertyDict = properties.reduce(
        (val, property: ConfigurationProperty) => {
            // Updates val with data for ConfigurationProperty
            if (property.allowDisable && !property.required) {
                val[property.identifier] = {
                    enabled: property.enabledByDefault,
                    value: buildConfigurationPropertyValue(property),
                };
            } else {
                val[property.identifier] = buildConfigurationPropertyValue(
                    property,
                );
            }
            // Returns val
            return val;
        },
        initialValue, // Passes in empty OptionValueInstance
    );

    // Returns ConfigurationGroupValue
    return configurationGroupValue;
}

/**
 * buildConfigurationGroupValue
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationProperty
 */
export function buildConfigurationGroupValue(
    configurationGroup: ConfigurationGroup,
): ConfigurationPropertyDict {
    const initialValue: ConfigurationPropertyDict = {};

    // Handle ConfigurationGroup w/ properties
    if (configurationGroup.properties) {
        // Defines empty ConfigurationGroupValue
        // Iterates over each property in the group and assigns values
        const configurationGroupValue: ConfigurationPropertyDict = configurationGroup.properties.reduce(
            (val, property: ConfigurationProperty) => {
                // Updates val with data for ConfigurationProperty
                if (property.allowDisable && !property.required) {
                    val[property.identifier] = {
                        enabled: property.enabledByDefault,
                        value: buildConfigurationPropertyValue(property),
                    };
                } else {
                    val[property.identifier] = buildConfigurationPropertyValue(
                        property,
                    );
                }
                // Returns val
                return val;
            },
            initialValue, // Passes in empty OptionValueInstance
        );

        // Returns ConfigurationGroupValue
        return configurationGroupValue;
    }

    // Handle ConfigurationGroup w/ Sections
    if (configurationGroup.sections) {
        // Iterate over each section
        const configurationGroupValue: ConfigurationPropertyDict = configurationGroup.sections.reduce(
            (val, section: ConfigurationGroupSection) => {
                // Defines initial value for the ConfigurationGroupSection
                const initialSectionValue: ConfigurationPropertyDict = {};

                // Iterates over each property in the ConfigurationGroupSection
                const sectionValue: ConfigurationPropertyDict = section.properties.reduce(
                    (val, property: ConfigurationProperty) => {
                        // Sets value for ConfigurationGroupSection
                        val[property.identifier] = {
                            enabled: property.enabledByDefault,
                            value: buildConfigurationPropertyValue(property),
                        };

                        // Returns val
                        return val;
                    },
                    initialSectionValue, // Passes in empty OptionValueInstance
                );

                // Returns ConfigurationGroupValue
                return {
                    ...initialValue,
                    [section.identifier]: sectionValue,
                };
            },
            initialValue,
        );

        // Returns the configurationGroupValue
        return configurationGroupValue;
    }
}

/**
 * buildDefaultConfiguration
 * Builds a new ConfigurationValue instance based on an array of ConfigurationGroup instances
 * @param configurationGroups - array of ConfigurationGroup instances
 */
export function buildDefaultConfiguration(
    configurationGroups: ConfigurationGroup[],
): ConfigurationValue {
    // Defines default ConfigurationValue
    const configurationValue: ConfigurationValue = configurationGroups.reduce(
        (val, configurationGroup: ConfigurationGroup) => {
            const initialValue: ConfigurationPropertyDict = buildConfigurationGroupValue(
                configurationGroup,
            );
            return { ...val, [configurationGroup.identifier]: initialValue };
        },
        {}, // Passes in empty ConfigurationValue
    );

    return configurationValue;
}

export function verifyDefaultSchemas(params: {
    schemas: SchemaInput[];
    configurationGroups: ConfigurationGroup[];
}): SchemaInput[] {
    return params.schemas.map((s) => {
        // Builds value for s.configuration
        const configuration: ConfigurationValue = buildDefaultConfiguration(
            params.configurationGroups,
        );

        // If s.configuration doesn't match configuration -> return new configuration value
        if (Object.keys(s.configuration) !== Object.keys(configuration)) {
            return {
                ...s,
                configuration,
            };
        }

        // Otherwise, return s
        return s;
    });
}

/**
 * buildDefaultProject
 * Builds an empty Project
 * @param pluginMetadata - the PluginMetadata for-which the ProjectInput is being constructed
 */
export function buildDefaultProjectInput(
    pluginMetadata: PluginMetadata,
): ProjectInput {
    // Defines default ConfigurationValue
    const configuration: ConfigurationValue = buildDefaultConfiguration(
        pluginMetadata.configurationGroups,
    );

    // Returns ConfigurationGroupValue
    const projectInput: ProjectInput = {
        id: "",
        identifiers: {
            title: "Project Name",
            snake: "project_name",
            camel: "projectName",
            pascal: "ProjectName",
            kebab: "project-name",
        },
        pluginID: pluginMetadata.identifier,
        pluginVersion: pluginMetadata.version,
        schemas: verifyDefaultSchemas({
            schemas: [
                ...pluginMetadata.schemaEditorConfiguration.defaultSchemas,
            ],
            configurationGroups:
                pluginMetadata.schemaEditorConfiguration.configurationGroups,
        }),
        relations: [
            ...pluginMetadata.schemaEditorConfiguration.defaultRelations,
        ],
        configuration,
    };

    // Returns the new project
    return projectInput;
}
