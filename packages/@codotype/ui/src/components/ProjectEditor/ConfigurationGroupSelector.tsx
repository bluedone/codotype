import * as React from "react";
import { ConfigurationInput } from "../ConfigurationInput";
import { SchemaEditorLayout } from "../SchemaEditor";
import {
    ProjectInput,
    PluginMetadata,
    ConfigurationGroup,
    ConfigurationPropertyDict,
    SchemaInput,
    RelationInput,
} from "@codotype/core";
import { PluginStart } from "../PluginStart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFlag } from "@fortawesome/free-solid-svg-icons";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    pinned?: boolean;
    onClick: () => void;
}) {
    const { label, pinned = false } = props;
    const btnClassName: string[] = ["nav-link"];
    if (props.active) {
        btnClassName.push("active");
    }

    if (props.pinned) {
        btnClassName.push("bg-dark mr-2 text-white");
    }

    return (
        <li className="nav-item">
            <button
                // TODO - fix styles here
                className={btnClassName.join(" ")}
                style={{
                    cursor: "pointer",
                }}
                onClick={props.onClick}
            >
                {props.pinned && (
                    <FontAwesomeIcon icon={faFlag} className="mr-2" />
                )}
                {label}
            </button>
        </li>
    );
}

/**
 * ConfigurationGroupSelector
 * @param props.projectInput
 * @param props.pluginMetadata
 * @param props.onChange
 */
export function ConfigurationGroupSelector(props: {
    projectInput: ProjectInput;
    pluginMetadata: PluginMetadata;
    onChange: (updatedProject: ProjectInput) => void;
}) {
    const { pluginMetadata } = props;
    // Gets default ConfigurationGroup to render
    const defaultConfigurationGroup: ConfigurationGroup | undefined =
        pluginMetadata.configurationGroups[0];

    // If there is no default ConfigurationGroup, return null
    if (!defaultConfigurationGroup) {
        return null;
    }

    // Stores the currently selected ConfigurationGroup
    const [
        selectedConfigurationGroup,
        selectConfigurationGroup,
    ] = React.useState<ConfigurationGroup>(defaultConfigurationGroup);

    // Defines a flag indicating whether or not the SchemaEditor is enabled for props.pluginMetadata
    // If false, schemas will not be selectable
    const {
        configurationGroups,
        supportedDatatypes,
        supportedRelationTypes,
    } = pluginMetadata.schemaEditorConfiguration;
    const enableSchemaEditor: boolean =
        configurationGroups.length > 0 ||
        supportedDatatypes.length > 0 ||
        supportedRelationTypes.length > 0;

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingSchemas, setViewingSchemas] = React.useState<boolean>(
        enableSchemaEditor,
    );

    // NOTE - enable/disable this if schemas aren't supported
    const [viewingReadme, setViewingReadme] = React.useState<boolean>(false);

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="nav nav-pills">
                    <ConfigurationGroupTab
                        pinned
                        onClick={() => {
                            setViewingReadme(true);
                            setViewingSchemas(false);
                        }}
                        active={viewingReadme}
                        label={"Start"}
                    // label={"README.md"}
                    />

                    {enableSchemaEditor && (
                        <ConfigurationGroupTab
                            onClick={() => {
                                setViewingReadme(false);
                                setViewingSchemas(true);
                            }}
                            active={viewingSchemas}
                            label={"Schemas"}
                        />
                    )}

                    {/* Renders the navigation for selecting a ConfigurationGroup */}
                    {pluginMetadata.configurationGroups.map(
                        (configurationGroup: ConfigurationGroup) => {
                            return (
                                <ConfigurationGroupTab
                                    key={configurationGroup.identifier}
                                    onClick={() => {
                                        setViewingSchemas(false);
                                        setViewingReadme(false);
                                        selectConfigurationGroup(
                                            configurationGroup,
                                        );
                                    }}
                                    active={
                                        configurationGroup.identifier ===
                                        selectedConfigurationGroup.identifier &&
                                        !viewingSchemas &&
                                        !viewingReadme
                                    }
                                    label={configurationGroup.content.label}
                                />
                            );
                        },
                    )}
                </ul>
            </div>
            <div className="col-lg-12">
                {/* Renders the ConfigurationInput */}
                {!viewingSchemas && !viewingReadme && (
                    <ConfigurationInput
                        configurationGroup={selectedConfigurationGroup}
                        value={
                            props.projectInput.configuration[
                            selectedConfigurationGroup.identifier
                            ]
                        }
                        onChange={(updatedVal: ConfigurationPropertyDict) => {
                            // Defines updatd project with latest configuration value
                            const updatedProject: ProjectInput = {
                                ...props.projectInput,
                                configuration: {
                                    ...props.projectInput.configuration,
                                    [selectedConfigurationGroup.identifier]: updatedVal,
                                },
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProject);
                        }}
                    />
                )}

                {/* Render README tab */}
                {viewingReadme && (
                    <div className="mt-4">
                        <div className="card card-body">
                            <PluginStart plugin={props.pluginMetadata} />
                        </div>
                    </div>
                )}

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && enableSchemaEditor && (
                    <SchemaEditorLayout
                        projectInput={props.projectInput}
                        schemas={props.projectInput.schemas}
                        pluginMetadata={pluginMetadata}
                        onChange={(updatedSchemas: SchemaInput[]) => {
                            // Defines updated project w/ latest schemas
                            const updatedProject: ProjectInput = {
                                ...props.projectInput,
                                schemas: [...updatedSchemas],
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProject);
                        }}
                        onChangeRelations={(
                            updatedRelations: RelationInput[],
                        ) => {
                            // Defines updated project w/ latest relations
                            const updatedProject: ProjectInput = {
                                ...props.projectInput,
                                relations: updatedRelations,
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
