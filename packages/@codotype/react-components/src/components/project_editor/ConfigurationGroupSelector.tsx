import * as React from "react";
import "./styles.scss";
import { ConfigurationInput } from "../configuration_group_input";
import { SchemaEditorLayout } from "../schema_editor";
import {
    Project,
    GeneratorMeta,
    ProjectConfiguration,
    ConfigurationGroup,
    OptionValueInstance,
} from "../types";

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

                {/* Render SchemaEditorLayout */}
                {viewingSchemas && (
                    <SchemaEditorLayout schemas={props.project.schemas} />
                )}
            </div>
            {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
            {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
        </div>
    );
}
