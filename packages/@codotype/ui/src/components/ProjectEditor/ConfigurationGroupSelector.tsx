import * as React from "react";
import classnames from "classnames";
import { ConfigurationInput } from "../ConfigurationInput";
import { SchemaEditorLayout } from "../SchemaEditor";
import {
    ProjectInput,
    PluginMetadata,
    ConfigurationGroup,
    ConfigurationPropertyDict,
} from "@codotype/core";
import { PluginStart } from "../PluginStart";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookOpen } from "@fortawesome/free-solid-svg-icons";
import { PluginPreviewFetcher } from "../../pages/web_runtime/PluginPreviewFetcher";
import { PreviewBrowser } from "../PreviewBrowser";
import { FadeIn } from "../FadeIn";
import { LoadingSpinner } from "../LoadingSpinner";
import { LoadingBuild } from "../LoadingBuild";
import { faLaugh } from "@fortawesome/free-regular-svg-icons";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    pinned?: boolean;
    disabled?: boolean;
    onClick: () => void;
    className?: string;
}) {
    const { label, disabled = false, className } = props;

    return (
        <button
            className={classnames(
                "focus:outline-none group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-900 py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10 select-none transition-colors",
                {
                    "cursor-not-allowed": disabled,
                    "text-primary-500 dark:text-primary-500": props.active,
                    "text-gray-500 hover:text-gray-700 dark:text-gray-200 dark:hover:text-gray-400": !props.active,
                },
            )}
            onClick={e => {
                e.currentTarget.blur();
                if (disabled === false) {
                    props.onClick();
                }
            }}
        >
            {props.pinned && (
                <FontAwesomeIcon icon={faBookOpen} className="mr-2" />
            )}
            <span className={className}>{label}</span>
            {props.active && (
                <span
                    aria-hidden="true"
                    className="bg-primary-500 absolute inset-x-0 bottom-0 h-1"
                ></span>
            )}
            {!props.active && (
                <span
                    aria-hidden="true"
                    className="bg-transparent absolute inset-x-0 bottom-0 h-1"
                ></span>
            )}
        </button>
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
    children?: (childProps: any) => React.ReactNode;
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
    const [viewingPreview, setViewingPreview] = React.useState<boolean>(false);

    // Defines default component for ConfigurationInput
    const defaultComponent = (
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
    );

    return (
        <div className="row">
            <div className="col-lg-12">
                <div className="flex flex-row mt-1 mb-1">
                    <div className="sm:hidden w-full">
                        <select
                            id="tabs"
                            name="tabs"
                            className="mt-1 block w-full pl-3 pr-10 py-2 text-base bg-white dark:bg-gray-700 border-gray-300 dark:border-gray-800 text-gray-900 dark:text-gray-200 focus:outline-none focus:ring-indigo-500 focus:border-primary-500 sm:text-sm rounded-md"
                            onChange={() => {
                                setViewingReadme(true);
                                setViewingSchemas(false);
                            }}
                        >
                            <option value="readme">README.md</option>
                            {enableSchemaEditor && (
                                <option value="schema">Data Model</option>
                            )}
                            {pluginMetadata.configurationGroups.map(
                                (configurationGroup: ConfigurationGroup) => {
                                    return (
                                        <option
                                            key={configurationGroup.identifier}
                                            value={
                                                configurationGroup.identifier
                                            }
                                        >
                                            {configurationGroup.content.label}
                                        </option>
                                    );
                                },
                            )}
                        </select>
                    </div>
                    <div className="hidden sm:flex w-full">
                        <div className="flex flex-grow rounded-lg overflow-hidden divide-x divide-gray-200 border-gray-200 dark:divide-gray-800 dark:border-gray-800 border dark:divide-gray-800">
                            <ConfigurationGroupTab
                                pinned
                                onClick={() => {
                                    setViewingReadme(true);
                                    setViewingPreview(false);
                                    setViewingSchemas(false);
                                }}
                                active={viewingReadme}
                                label="README"
                            />

                            {enableSchemaEditor && (
                                <ConfigurationGroupTab
                                    onClick={() => {
                                        setViewingReadme(false);
                                        setViewingPreview(false);
                                        setViewingSchemas(true);
                                    }}
                                    active={viewingSchemas}
                                    label={"Data Model"}
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
                                                setViewingPreview(false);
                                                selectConfigurationGroup(
                                                    configurationGroup,
                                                );
                                            }}
                                            active={
                                                configurationGroup.identifier ===
                                                    selectedConfigurationGroup.identifier &&
                                                !viewingSchemas &&
                                                !viewingReadme &&
                                                !viewingPreview
                                            }
                                            label={
                                                configurationGroup.content.label
                                            }
                                        />
                                    );
                                },
                            )}

                            <ConfigurationGroupTab
                                onClick={() => {
                                    setViewingReadme(false);
                                    setViewingSchemas(false);
                                    setViewingPreview(true);
                                }}
                                active={viewingPreview}
                                label={"Preview Code"}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                {!viewingSchemas &&
                    !viewingReadme &&
                    !viewingPreview &&
                    props.children !== undefined && (
                        <>
                            {props.children({
                                defaultComponent,
                                selectedConfigurationGroup,
                                value:
                                    props.projectInput.configuration[
                                        selectedConfigurationGroup.identifier
                                    ],
                                onChange: (
                                    updatedVal: ConfigurationPropertyDict,
                                ) => {
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
                                },
                            })}
                        </>
                    )}

                {/* Renders the ConfigurationInput */}
                {!viewingSchemas &&
                    !viewingReadme &&
                    !viewingPreview &&
                    !props.children && <>{defaultComponent}</>}

                {/* Render README tab */}
                {viewingReadme && (
                    <div className="mt-4 card rounded-xl shadow px-5 pt-5 pb-10">
                        <PluginStart plugin={props.pluginMetadata} />
                    </div>
                )}

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && enableSchemaEditor && (
                    <>
                        <div className={classnames("mt-5 mb-4")}>
                            <div className="flex items-center mb-2 text-body select-none">
                                <h4 className="mb-0 mr-3 text-3xl">
                                    Data Model
                                </h4>

                                <p className="mb-0 text-lg font-extralight mt-1">
                                    Build the data model for your application
                                </p>
                            </div>
                            <hr className="my-3" />
                        </div>
                        <SchemaEditorLayout
                            projectInput={props.projectInput}
                            pluginMetadata={pluginMetadata}
                            onChange={(updatedProjectInput: ProjectInput) => {
                                // Invokes props.onChange with updated project
                                props.onChange(updatedProjectInput);
                            }}
                        />
                    </>
                )}

                {/* Render PREVIEW tab */}
                {viewingPreview && (
                    <>
                        <div className={classnames("mt-5 mb-4")}>
                            <div className="flex items-center mb-2 text-body select-none">
                                <h4 className="mb-0 mr-3 text-3xl">
                                    Preview Code
                                </h4>

                                <p className="mb-0 text-lg font-extralight mt-1">
                                    Preview your new codebase before downloading
                                </p>
                            </div>
                            <hr className="my-3" />
                        </div>
                        <PluginPreviewFetcher projectInput={props.projectInput}>
                            {({ loading, error, files }) => {
                                return (
                                    <>
                                        {loading && (
                                            <FadeIn show={loading} speed="slow">
                                                <div
                                                    className="flex flex-col items-center h-full justify-center select-none"
                                                    style={{
                                                        minHeight: "28rem",
                                                    }}
                                                >
                                                    <div className="flex justify-center my-8">
                                                        <div className="my-2">
                                                            <FadeIn
                                                                show={true}
                                                                speed="slow"
                                                            >
                                                                <LoadingSpinner />
                                                            </FadeIn>
                                                        </div>
                                                    </div>
                                                </div>
                                            </FadeIn>
                                        )}
                                        <FadeIn speed="slow" show={!loading}>
                                            {error && <p>Preview error!</p>}
                                            {!error && (
                                                <PreviewBrowser files={files} />
                                            )}
                                        </FadeIn>
                                    </>
                                );
                            }}
                        </PluginPreviewFetcher>
                    </>
                )}
            </div>
        </div>
    );
}
