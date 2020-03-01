import React, { FunctionComponent } from "react";
import "./styles.scss";
import {
    ConfigurationGroup,
    OptionValueInstance,
} from "../configuration_group_input";
import { ConfigurationGroupSelector } from "./ConfigurationGroupSelector";
import { ProjectEditorHeader } from "./ProjectEditorHeader";

// // // //

export interface ProjectConfiguration {
    [key: string]: OptionValueInstance;
}

export interface SchemaV2 {
    id: null | string;
    locked: boolean;
    source: string; // SchemaSource enum;
    removable: boolean;
    tokens: any; // SchemaTokenCasing;
    attributes: any[];
    relations: any[];
    configuration: ProjectConfiguration;
    // reverse_relations: any[]; <--- these are _derived_, a computed value - doesn't need to be stored
}

export interface Project {
    label: string;
    generatorId: string;
    generatorVersion: string;
    configuration: ProjectConfiguration;
    schemas: SchemaV2[];
}

export enum ExperienceRecommendation {
    BEGINNER = "beginner",
    JUNIOR = "junior",
    INTERMEDIATE = "intermediate",
    EXPERT = "expert",
}

export interface SchemaConfigurationGroup {
    configurationGroups: any[]; // ConfigurationGroup
    // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
    supportedDatatypes: any[]; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    supportedRelations: any[]; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
}

export interface GeneratorMeta {
    id: string; // unique ID for the generator
    label: string; // short label for the generator
    description: string; // brief description of the generator
    icon: string; // URL to the generator's icon. Must be at least 200x200px
    homepage: string; // the "homepage" for this generator
    version: string; // the current version of the generator
    created_by: string; // optional (replaces "official")
    tech_tags: any; // an array of strings describing the tech used in the generator
    type_tags: any; // describes the type of codebase produced by this generator
    experience: ExperienceRecommendation; // an optional tag detailing the level of experience required to use the code produced by the generator
    project_path: string; // the name of the directory for the generator's output
    schemaConfigurationGroup: SchemaConfigurationGroup;
    configuration_groups: ConfigurationGroup[]; // an array of OptionGroup objects that expose additional configuration provided by the generator
    // All of this gets merged into configuration groups
    // defaultSchemas: any; // a Schemas array containing default schemas to load with the project.Learn more about default schema behavior here
    // defaultConfiguration: any; // object that can provide optional defaults / examples for each ConfigurationGroup.This is where you can supply default Addon data for different ConfigurationGroups
    // supportedDatatypes: any; // The datatypes supported by this generator.Only an array of DATATYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
    // supportedRelations: any; // The relation types supported by this generator.Only an array of RELATION_TYPE_ * identifiers that correspond to values defined in @codotype/types are accepted.
}

// // // //

interface ProjectEditorProps {
    label: string;
    generator: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
    // enableImport?: boolean;
    // enableExport?: boolean;
}

export const ProjectEditor: FunctionComponent<ProjectEditorProps> = (
    props: ProjectEditorProps,
) => {
    const { generator, project } = props;
    return (
        <div className="card card-body">
            <div className="row">
                <div className="col-sm-12">
                    {/* Render ProjectEditorHeader */}
                    <ProjectEditorHeader
                        generatorMeta={generator}
                        project={project}
                        onChange={props.onChange}
                        onClickGenerate={props.onClickGenerate}
                    />

                    {/* Render ConfigurationGroupSelector */}
                    <ConfigurationGroupSelector
                        project={project}
                        generatorMeta={generator}
                        onChange={(
                            updatedProjectConfiguration: ProjectConfiguration,
                        ) => {
                            // Defines the updated project
                            const updatedProject: Project = {
                                ...project,
                                configuration: updatedProjectConfiguration,
                            };

                            // Invokes props.onChange with the updated project
                            props.onChange(updatedProject);
                        }}
                    />
                </div>
            </div>
        </div>
    );
};
