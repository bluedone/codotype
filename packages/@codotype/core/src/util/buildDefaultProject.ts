import {
    SchemaInput,
    ProjectInput,
    PropertyType,
    OptionValue,
    PluginConfiguration,
    OptionValueInstance,
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
): OptionValue {
    if (property.type === PropertyType.STRING) {
        return property.defaultValue || "";
    }
    if (property.type === PropertyType.BOOLEAN) {
        return property.defaultValue || false;
    }
    if (property.type === PropertyType.DROPDOWN) {
        return property.defaultValue
            ? property.defaultValue
            : property.dropdownOptions.length > 0
            ? property.dropdownOptions[0].value
            : "";
    }
    if (property.type === PropertyType.COLLECTION) {
        if (Array.isArray(property.defaultValue)) {
            return property.defaultValue;
        }
        // Return empty array as default
        return [];
    }
    if (property.type === PropertyType.INSTANCE) {
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
): OptionValueInstance {
    const initialValue: OptionValueInstance = {};

    // Defines empty ConfigurationGroupValue
    // Iterates over each property in the group and assigns values
    const configurationGroupValue: OptionValueInstance = properties.reduce(
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
): OptionValueInstance {
    const initialValue: OptionValueInstance = {};

    // Handle ConfigurationGroup w/ properties
    if (configurationGroup.properties) {
        // Defines empty ConfigurationGroupValue
        // Iterates over each property in the group and assigns values
        const configurationGroupValue: OptionValueInstance = configurationGroup.properties.reduce(
            (val, property: ConfigurationProperty) => {
                // Updates val with data for ConfigurationProperty
                // TODO - remove this - the UI should only care if the property can allow disable or not
                // TODO - remove this - the UI should only care if the property can allow disable or not
                // TODO - remove this - the UI should only care if the property can allow disable or not
                // TODO - remove this - the UI should only care if the property can allow disable or not
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
        const configurationGroupValue: OptionValueInstance = configurationGroup.sections.reduce(
            (val, section: ConfigurationGroupSection) => {
                // Defines initial value for the ConfigurationGroupSection
                const initialSectionValue: OptionValueInstance = {};

                // Iterates over each property in the ConfigurationGroupSection
                const sectionValue: OptionValueInstance = section.properties.reduce(
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
 * Builds a new PluginConfiguration instance based on an array of ConfigurationGroup instances
 * @param configurationGroups - array of ConfigurationGroup instances
 */
export function buildDefaultConfiguration(
    configurationGroups: ConfigurationGroup[],
): PluginConfiguration {
    // Defines default PluginConfiguration
    const PluginConfiguration: PluginConfiguration = configurationGroups.reduce(
        (val, configurationGroup: ConfigurationGroup) => {
            const initialValue: OptionValueInstance = buildConfigurationGroupValue(
                configurationGroup,
            );
            return { ...val, [configurationGroup.identifier]: initialValue };
        },
        {}, // Passes in empty PluginConfiguration
    );

    return PluginConfiguration;
}

/**
 * buildDefaultSchemas
 * Builds the default value for Project.schemas
 */
export function buildDefaultSchemas(
    pluginMetadata: PluginMetadata,
): SchemaInput[] {
    if (pluginMetadata.schemaEditorConfiguration.defaultSchemas) {
        return pluginMetadata.schemaEditorConfiguration.defaultSchemas.map(
            (s) => {
                return {
                    ...s,
                    configuration: buildDefaultConfiguration(
                        pluginMetadata.schemaEditorConfiguration
                            .configurationGroups,
                    ),
                };
            },
        );
    }
    return [];
}

/**
 * buildDefaultProject
 * Builds an empty Project
 * @param pluginMetadata - the PluginMetadata for-which the ProjectInput is being constructed
 */
export function buildDefaultProjectInput(
    pluginMetadata: PluginMetadata,
): ProjectInput {
    // Defines default PluginConfiguration
    const PluginConfiguration: PluginConfiguration = buildDefaultConfiguration(
        pluginMetadata.configurationGroups,
    );

    // Defines default value for Project.schemas
    const defaultSchemas: SchemaInput[] = buildDefaultSchemas(pluginMetadata);

    // Returns ConfigurationGroupValue
    const projectInput: ProjectInput = {
        id: "",
        identifiers: {
            title: "New Project",
            snake: "new_project",
            camel: "newProject",
            pascal: "NewProject",
            kebab: "new-project",
        },
        pluginID: pluginMetadata.id,
        pluginVersion: pluginMetadata.version,
        schemas: [...defaultSchemas],
        relations: [],
        configuration: PluginConfiguration,
    };

    // Returns the new project
    return projectInput;
}
