import {
    GeneratorMeta,
    Project,
    ProjectConfiguration,
    ConfigurationGroup,
    OptionValueInstance,
} from "@codotype/types";
import "./styles.scss";
import { buildConfigurationGroupValue } from "@codotype/util";

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
        label: "Project Name",
        identifier: "project_name",
        generatorId: generatorMeta.id,
        generatorVersion: generatorMeta.version,
        schemas: [],
        configuration: projectConfiguration,
    };

    // Returns the new project
    return newProject;
}
