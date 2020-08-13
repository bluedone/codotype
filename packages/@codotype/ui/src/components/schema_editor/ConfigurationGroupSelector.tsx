import * as React from "react";
import { ConfigurationInput } from "../configuration_group_input";
import {
    ConfigurationGroup,
    OptionValueInstance,
    ProjectConfiguration,
} from "@codotype/core";

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
    configuration: ProjectConfiguration;
    configurationGroups: ConfigurationGroup[];
    children: React.ReactNode;
    onChange: (updatedProjectConfiguration: ProjectConfiguration) => void;
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
                <ul className="nav nav-tabs">
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
                            props.configuration[
                            selectedConfigurationGroup.identifier
                            ]
                        }
                        onChange={(updatedVal: OptionValueInstance) => {
                            // Defines updatd project with latest configuration value
                            const updatedProjectConfiguration: ProjectConfiguration = {
                                ...props.configuration,
                                [selectedConfigurationGroup.identifier]: updatedVal,
                            };

                            // Invokes props.onChange with updated project
                            props.onChange(updatedProjectConfiguration);
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
