import {
    Schema,
    Project,
    OptionType,
    OptionValue,
    ProjectConfiguration,
    OptionValueInstance,
    ConfigurationGroup,
    ConfigurationGroupSection,
    GeneratorMeta,
    ConfigurationGroupProperty,
} from "../";

// // // //

/**
 * buildConfigurationGroupPropertyValue
 * Accepts a single ConfigurationGroupProperty and recursively produces its associated OptionValue instance
 * @param property - the single ConfigurationGroupProperty for which the OptionValue is being produced
 */
export function buildConfigurationGroupPropertyValue(
    property: ConfigurationGroupProperty,
): OptionValue {
    if (property.type === OptionType.STRING) {
        return property.defaultValue || "";
    }
    if (property.type === OptionType.BOOLEAN) {
        return property.defaultValue || false;
    }
    if (property.type === OptionType.DROPDOWN) {
        return property.defaultValue
            ? property.defaultValue
            : property.dropdownOptions.length > 0
            ? property.dropdownOptions[0].value
            : "";
    }
    if (property.type === OptionType.COLLECTION) {
        if (Array.isArray(property.defaultValue)) {
            return property.defaultValue;
        }
        // Return empty array as default
        return [];
    }
    if (property.type === OptionType.INSTANCE) {
        return buildValueFromProperties(property.properties);
    }
    return "";
}

/**
 * buildValueFromProperties
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationGroupProperty
 */
export function buildValueFromProperties(
    properties: ConfigurationGroupProperty[],
): OptionValueInstance {
    const initialValue: OptionValueInstance = {};

    // Defines empty ConfigurationGroupValue
    // Iterates over each property in the group and assigns values
    const configurationGroupValue: OptionValueInstance = properties.reduce(
        (val, property: ConfigurationGroupProperty) => {
            // Updates val with data for ConfigurationGroupProperty
            if (property.allowDisable && !property.required) {
                val[property.identifier] = {
                    enabled: property.enabled,
                    value: buildConfigurationGroupPropertyValue(property),
                };
            } else {
                val[property.identifier] = buildConfigurationGroupPropertyValue(
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
 * TODO - update this to wrap the `OptionValueInstance` for the `configurationGroup` param in `{enabled, value}` if configurationGroup.allowDisable is true
 * @param properties - array of ConfigurationGroupProperty
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
            (val, property: ConfigurationGroupProperty) => {
                // Updates val with data for ConfigurationGroupProperty
                // TODO - remove this - the UI should only care if the property can allow disable or not
                if (property.allowDisable && !property.required) {
                    val[property.identifier] = {
                        enabled: property.enabled,
                        value: buildConfigurationGroupPropertyValue(property),
                    };
                } else {
                    val[
                        property.identifier
                    ] = buildConfigurationGroupPropertyValue(property);
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
                    (val, property: ConfigurationGroupProperty) => {
                        // Sets value for ConfigurationGroupSection
                        val[property.identifier] = {
                            enabled: property.enabled,
                            value: buildConfigurationGroupPropertyValue(
                                property,
                            ),
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
 * Builds a new ProjectConfiguration instance based on an array of ConfigurationGroup instances
 * @param configurationGroups - array of ConfigurationGroup instances
 */
export function buildDefaultConfiguration(
    configurationGroups: ConfigurationGroup[],
): ProjectConfiguration {
    // Defines default ProjectConfiguration
    const projectConfiguration: ProjectConfiguration = configurationGroups.reduce(
        (val, configurationGroup: ConfigurationGroup) => {
            const initialValue: OptionValueInstance = buildConfigurationGroupValue(
                configurationGroup,
            );
            return { ...val, [configurationGroup.identifier]: initialValue };
        },
        {}, // Passes in empty ProjectConfiguration
    );

    return projectConfiguration;
}

/**
 * buildDefaultSchemas
 * Builds the default value for Project.schemas
 */
export function buildDefaultSchemas(generatorMeta: GeneratorMeta): Schema[] {
    if (generatorMeta.schemaEditorConfiguration.defaultSchemas) {
        return generatorMeta.schemaEditorConfiguration.defaultSchemas.map(
            (s) => {
                return {
                    ...s,
                    configuration: buildDefaultConfiguration(
                        generatorMeta.schemaEditorConfiguration
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
 * @param
 */
export function buildDefaultProject(generatorMeta: GeneratorMeta): Project {
    // Defines default ProjectConfiguration
    const projectConfiguration: ProjectConfiguration = buildDefaultConfiguration(
        generatorMeta.configurationGroups,
    );

    // Defines default value for Project.schemas
    const defaultSchemas: Schema[] = buildDefaultSchemas(generatorMeta);

    // Returns ConfigurationGroupValue
    const newProject: Project = {
        id: "",
        identifiers: {
            label: "New Project",
            snake: "new_project",
            camel: "newProject",
            pascal: "NewProject",
            kebab: "new-project",
        },
        generatorId: generatorMeta.id,
        generatorVersion: generatorMeta.version,
        schemas: [...defaultSchemas],
        configuration: projectConfiguration,
    };

    // Returns the new project
    return newProject;
}
