import * as React from "react";
import { ConfigurationInput } from "../ConfigurationInput";
import {
    ConfigurationGroup,
    ConfigurationPropertyDict,
    ConfigurationValue,
} from "@codotype/core";

// // // //

export function ConfigurationGroupTab(props: {
    label: string;
    active: boolean;
    onClick: () => void;
}) {
    const { label } = props;
    const btnClassName: string[] = ["btn"];
    if (props.active) {
        btnClassName.push("btn-light active");
    } else {
        btnClassName.push("btn-light");
    }

    return (
        <div className="d-flex mr-2">
            <button
                className={btnClassName.join(" ")}
                onClick={(e) => {
                    e.currentTarget.blur();
                    props.onClick();
                }}
            >
                {label}
            </button>
        </div>
    );
}

/**
 * ConfigurationGroupSelector
 * @param props.project
 * @param props.PluginMetadata
 * @param props.onChange
 */
export function ConfigurationGroupSelector(props: {
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
        return <React.Fragment>{props.children}</React.Fragment>;
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
                <div className="d-flex flex-row mt-3 mb-2">
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
                                    label={configurationGroup.content.label}
                                />
                            );
                        },
                    )}
                </div>
            </div>
            <div className="col-lg-12">
                {/* Renders the ConfigurationInput */}
                {!viewingSchemas && (
                    <ConfigurationInput
                        configurationGroup={selectedConfigurationGroup}
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
