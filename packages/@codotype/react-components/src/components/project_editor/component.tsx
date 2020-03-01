import React, { FunctionComponent } from "react";
import "./styles.scss";
import {
    ConfigurationGroup,
    ConfigurationInput,
    OptionValueInstance,
    buildConfigurationGroupValue,
} from "../configuration_group_input";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { GenerateCodeButton } from "./GenerateCodeButton";
import { faPencilAlt } from "@fortawesome/free-solid-svg-icons";

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

// // // //

export interface ProjectConfiguration {
    [key: string]: OptionValueInstance;
}

export interface SchemaV2 {
    id: null | string;
    locked: boolean;
    source: string; // SchemaSource;
    removable: boolean;
    tokens: any; // SchemaTokenCasing;
    attributes: any[];
    relations: any[];
    configuration: ProjectConfiguration; // ProjectConfiguration, wow!
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

function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    const { label } = props;
    const btnClassName: string[] = ["mx-2", "btn", "btn-outline-primary"];
    if (props.active) {
        btnClassName.push("active");
    }

    return (
        <button onClick={props.onClick} className={btnClassName.join(" ")}>
            {label}
        </button>
    );
}

export function ConfigurationGroupSelector(props: {
    project: Project;
    generatorMeta: GeneratorMeta;
    onChange: (updatedConfiguration: ProjectConfiguration) => void;
}) {
    const { generatorMeta } = props;
    // Gets default ConfigurationGroup to render
    const defaultConfigurationGroup: ConfigurationGroup | undefined =
        generatorMeta.configuration_groups[0];

    // If there is no default ConfigurationGroup, return null
    if (!defaultConfigurationGroup) {
        return null;
    }

    // Stores the currently selected ConfigurationGroup
    const [
        selectedConfigurationGroup,
        selectConfigurationGroup,
    ] = React.useState<ConfigurationGroup>(defaultConfigurationGroup);

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingSchemas, setViewingSchemas] = React.useState<boolean>(true);
    return (
        <div className="row">
            <div className="col-lg-12">
                <ConfigurationGroupTab
                    onClick={() => {
                        setViewingSchemas(true);
                    }}
                    active={viewingSchemas}
                    label={"Schemas"}
                />
                {/* Renders the navigation for selecting a ConfigurationGroup */}
                {generatorMeta.configuration_groups.map(
                    (configurationGroup: ConfigurationGroup) => {
                        return (
                            <ConfigurationGroupTab
                                key={configurationGroup.identifier}
                                onClick={() => {
                                    setViewingSchemas(false);
                                    selectConfigurationGroup(
                                        configurationGroup,
                                    );
                                }}
                                active={
                                    configurationGroup.identifier ===
                                        selectedConfigurationGroup.identifier &&
                                    !viewingSchemas
                                }
                                label={configurationGroup.label}
                            />
                        );
                    },
                )}
            </div>
            <div className="col-lg-12">
                {/* Renders the ConfigurationInput */}
                {!viewingSchemas && (
                    <ConfigurationInput
                        configurationGroup={selectedConfigurationGroup}
                        value={
                            props.project.configuration[
                                selectedConfigurationGroup.identifier
                            ]
                        }
                        onChange={(updatedVal: OptionValueInstance) => {
                            console.log("OnChangeVal!");
                            console.log(updatedVal);
                            // setVal(updatedVal);
                            // increment();
                        }}
                    />
                )}

                {/* Render SchemaEditor */}
                {viewingSchemas && <p>SCHEMA EDITOR</p>}
            </div>
            {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
        </div>
    );
}

// // // //

export function ProjectEditButton() {
    return (
        <button className="btn btn-link">
            <FontAwesomeIcon icon={faPencilAlt} />
        </button>
    );
}

export function ProjectEditorHeader(props: {
    generatorMeta: GeneratorMeta;
    project: Project;
    onChange: (updatedProject: Project) => void;
    onClickGenerate: () => void;
}) {
    return (
        <div className="row d-flex align-items-center">
            <div className="col-lg-6">
                <span className="d-flex align-items-center">
                    <h4 className="mb-0 mr-2 d-flex">{props.project.label}</h4>
                    <ProjectEditButton />
                    {/* <EditProjectModal /> */}
                    {/* <HelpPopover /> */}
                </span>
            </div>
            <div className="col-lg-6 d-flex justify-content-end">
                {/* <HelpButton /> */}
                {/* < TourButton /> */}
                {/* <ProjectDropdown /> */}
                <GenerateCodeButton onClick={props.onClickGenerate} />
                {/* <ImportModal /> */}
                {/* <ExportModal /> */}
            </div>
            <div className="col-lg-12">
                <hr />
            </div>
        </div>
    );
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
