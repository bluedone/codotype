import {
    GeneratorMeta,
    Project,
    ProjectConfiguration,
    ConfigurationGroup,
    OptionValueInstance,
} from "../types";
import "./styles.scss";
import { buildConfigurationGroupValue } from "../configuration_group_input";

// // // //

/**
 * buildDefaultProject
 * Builds an empty Project
 * @param
 */
export function buildDefaultProject(generatorMeta: GeneratorMeta): Project {
    // Defines default ProjectConfiguration
    const projectConfiguration: ProjectConfiguration = generatorMeta.configuration_groups.reduce(
        (val, configurationGroup: ConfigurationGroup) => {
            const initialValue: OptionValueInstance = buildConfigurationGroupValue(
                configurationGroup.properties,
            );
            return { ...val, [configurationGroup.identifier]: initialValue };
        },
        {}, // Passes in empty ProjectConfiguration
    );

    // Returns ConfigurationGroupValue
    const newProject: Project = {
        label: "My New Project",
        generatorId: generatorMeta.id,
        schemas: [],
        generatorVersion: generatorMeta.version,
        configuration: projectConfiguration,
    };

    // Returns the new project
    return newProject;
}
