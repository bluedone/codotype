import * as React from "react";
import "./styles.scss";
import { ConfigurationInput } from "../configuration_group_input";
import { SchemaEditorLayout } from "../schema_editor";
import {
    Project,
    Schema,
    GeneratorMeta,
    ConfigurationGroup,
    OptionValueInstance,
} from "@codotype/types";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    const { label } = props;
    const btnClassName: string[] = ["nav-link"];
    if (props.active) {
        btnClassName.push("active");
    }

    return (
        <li className="nav-item">
            <a
                // href="#"
                // TODO - fix styles here, replace with <button>
                className={btnClassName.join(" ")}
                style={{
                    cursor: "pointer",
                }}
                onClick={props.onClick}
            >
                {label}
            </a>
        </li>
    );
}

/**
 * ConfigurationGroupSelector
 * @param props.project
 * @param props.generatorMeta
 * @param props.onChange
 */
export function ConfigurationGroupSelector(props: {
    project: Project;
    generatorMeta: GeneratorMeta;
    onChange: (updatedProject: Project) => void;
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

    // Defines a flag indicating whether or not the SchemaEditor is enabled for props.generator
    // If false, schemas will not be selectable
    const {
        configurationGroups,
        supportedDatatypes,
        supportedRelations,
    } = generatorMeta.schemaConfigurationGroup;
    const enableSchemaEditor: boolean =
        configurationGroups.length > 0 ||
        supportedDatatypes.length > 0 ||
        supportedRelations.length > 0;

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingSchemas, setViewingSchemas] = React.useState<boolean>(
        enableSchemaEditor,
    );

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="nav nav-tabs">
                    {enableSchemaEditor && (
                        <ConfigurationGroupTab
                            onClick={() => {
                                setViewingSchemas(true);
                            }}
                            active={viewingSchemas}
                            label={"Schemas"}
                        />
                    )}

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
                </ul>
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

                            // Defines updatd project with latest configuration value
                            const updatedProject: Project = {
                                ...props.project,
                                configuration: {
                                    ...props.project.configuration,
                                    [selectedConfigurationGroup.identifier]: updatedVal,
                                },
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProject);
                        }}
                    />
                )}

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && enableSchemaEditor && (
                    <SchemaEditorLayout
                        schemas={props.project.schemas}
                        generatorMeta={generatorMeta}
                        onChange={(updatedSchemas: Schema[]) => {
                            console.log("Updated Schemas");
                            console.log(updatedSchemas);
                            // Defines updated project
                            // TODO - update configuation after schemas update?
                            const updatedProject: Project = {
                                ...props.project,
                                schemas: [...updatedSchemas],
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProject);
                        }}
                    />
                )}
            </div>
            {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
        </div>
    );
}
