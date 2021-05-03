import * as React from "react";
import { ConfigurationInput } from "../ConfigurationInput";
import {
    ConfigurationGroup,
    ConfigurationPropertyDict,
    ConfigurationValue,
    SchemaInput,
} from "@codotype/core";
import classnames from "classnames";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    const { label } = props;

    return (
        <button
            className={classnames(
                "focus:outline-none group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-900 py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10",
                {
                    "text-gray-900 dark:text-gray-500": props.active,
                    "text-gray-500 hover:text-gray-700 dark:hover:text-gray-400": !props.active,
                },
            )}
            onClick={e => {
                e.currentTarget.blur();
                props.onClick();
            }}
        >
            <span>{label}</span>
            {props.active && (
                <span
                    aria-hidden="true"
                    className="bg-indigo-500 absolute inset-x-0 bottom-0 h-1"
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
 * @param props.project
 * @param props.PluginMetadata
 * @param props.onChange
 */
export function ConfigurationGroupSelector(props: {
    schemaInput: SchemaInput;
    configuration: ConfigurationValue;
    configurationGroups: ConfigurationGroup[];
    children: React.ReactNode;
    onChange: (updatedPluginConfiguration: ConfigurationValue) => void;
}) {
    const { configurationGroups } = props;

    // Gets default ConfigurationGroup to render
    const defaultConfigurationGroup: ConfigurationGroup | undefined =
        configurationGroups[0];

    // If there is no default ConfigurationGroup -> just return props.children
    if (!defaultConfigurationGroup) {
        return <div className="mt-5">{props.children}</div>;
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
                <div className="flex flex-row mt-4 mb-5">
                    <div className="sm:hidden w-full">
                        <select
                            id="schema-tabs"
                            name="schema-tabs"
                            className="block w-full focus:ring-indigo-500 focus:border-indigo-500 border-gray-300 rounded-md"
                            onChange={e => {
                                const type = e.currentTarget.value;
                                if (type === "schema") {
                                    setViewingSchemas(true);
                                    return;
                                }
                                const updatedSelectedGroup = configurationGroups.find(
                                    c => c.identifier === type,
                                );
                                if (updatedSelectedGroup) {
                                    selectConfigurationGroup(
                                        updatedSelectedGroup,
                                    );
                                }
                                setViewingSchemas(false);
                            }}
                        >
                            <option value="schema">Data Model</option>
                            {configurationGroups.map(
                                (configurationGroup: ConfigurationGroup) => {
                                    return (
                                        <option
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
                        <div className="flex flex-grow rounded-lg overflow-hidden divide-x divide-gray-200 border-gray-200 border dark:divide-gray-800 dark:border-gray-800">
                            <ConfigurationGroupTab
                                onClick={() => {
                                    setViewingSchemas(true);
                                }}
                                active={viewingSchemas}
                                label={"Schema"}
                            />

                            {/* Renders the navigation for selecting a ConfigurationGroup */}
                            {configurationGroups.map(
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
                                            label={
                                                configurationGroup.content.label
                                            }
                                        />
                                    );
                                },
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <div className="col-lg-12">
                {/* Renders the ConfigurationInput */}
                {!viewingSchemas && (
                    <ConfigurationInput
                        configurationGroup={selectedConfigurationGroup}
                        schemaInput={props.schemaInput}
                        value={
                            props.configuration[
                            selectedConfigurationGroup.identifier
                            ]
                        }
                        onChange={(updatedVal: ConfigurationPropertyDict) => {
                            // Defines updatd project with latest configuration value
                            const updatedPluginConfiguration: ConfigurationValue = {
                                ...props.configuration,
                                [selectedConfigurationGroup.identifier]: updatedVal,
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedPluginConfiguration);
                        }}
                    />
                )}

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && <div className="mt-3">{props.children}</div>}
            </div>
            {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
        </div>
    );
}
