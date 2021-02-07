import * as React from "react";
import {
    ConfigurationGroup,
    ConfigurationProperty,
    ConfigurationPropertyDict,
} from "@codotype/core";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";

// // // //

/**
 * ConfigurationGroupPropertiesTabs
 * @param props.configurationGroup
 */
export function ConfigurationGroupPropertiesTabs(props: {
    configurationGroup: ConfigurationGroup;
    value: ConfigurationPropertyDict;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}) {
    const { configurationGroup, value, onChange } = props;

    // Setup selectedPropertyID state
    const [selectedPropertyID, setSelectedPropertyID] = React.useState<string>(
        "",
    );

    // Sets selectedPropertyID
    const firstProperty: ConfigurationProperty | undefined =
        configurationGroup.properties[0];

    // Return null if firstProperty is undefined
    if (firstProperty === undefined) {
        return null;
    }

    // Set selectedPropertyID
    if (selectedPropertyID === "") {
        setSelectedPropertyID(firstProperty.identifier);
        return null;
    }

    // Finds selectedProperty
    const selectedProperty:
        | ConfigurationProperty
        | undefined = configurationGroup.properties.find(
            p => p.identifier === selectedPropertyID,
        );

    // Return null if selectedProperty is undefined
    if (selectedProperty === undefined) {
        return null;
    }

    return (
        <React.Fragment>
            <nav className="nav nav-tabs">
                {configurationGroup.properties.map(property => {
                    // Defines className for tab
                    const tabClassName: string[] = ["nav-link w-full"];
                    if (property.identifier === selectedPropertyID) {
                        tabClassName.push("active");
                    }

                    return (
                        <li className="nav-item">
                            <a
                                className={tabClassName.join()}
                                href={"#"}
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedPropertyID(property.identifier);
                                }}
                            >
                                {property.content.label}
                            </a>
                        </li>
                    );
                })}
            </nav>

            {/* Render ConfigurationGroupPropertiesInput */}
            <ConfigurationGroupPropertiesInput
                value={value}
                onChange={onChange}
                properties={[selectedProperty]}
            />
        </React.Fragment>
    );
}
