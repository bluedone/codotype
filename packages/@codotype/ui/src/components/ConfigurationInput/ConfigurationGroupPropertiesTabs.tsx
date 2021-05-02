import * as React from "react";
import classnames from "classnames";
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
            {/* TODO - add select here? */}
            {/* TODO - add select here? */}
            {/* TODO - add select here? */}
            {/* TODO - add select here? */}
            <div className="flex flex-grow rounded-lg overflow-hidden divide-x divide-gray-200 border-gray-200 border dark:divide-gray-800 dark:border-gray-800 mb-1">
                {configurationGroup.properties.map(property => {
                    const active = property.identifier === selectedPropertyID;

                    return (
                        <button
                            onClick={e => {
                                e.preventDefault();
                                e.stopPropagation();
                                setSelectedPropertyID(property.identifier);
                            }}
                            className={classnames(
                                "focus:outline-none group relative min-w-0 flex-1 overflow-hidden bg-white dark:bg-gray-900 py-4 px-4 text-sm font-medium text-center hover:bg-gray-50 focus:z-10",
                                {
                                    "text-gray-900 dark:text-gray-500": active,
                                    "text-gray-500 hover:text-gray-700 dark:hover:text-gray-400": !active,
                                },
                            )}
                        >
                            <span>{property.content.label}</span>
                            {active && (
                                <span
                                    aria-hidden="true"
                                    className="bg-indigo-500 absolute inset-x-0 bottom-0 h-1"
                                ></span>
                            )}
                            {!active && (
                                <span
                                    aria-hidden="true"
                                    className="bg-transparent absolute inset-x-0 bottom-0 h-1"
                                ></span>
                            )}
                        </button>
                    );
                })}
            </div>

            {/* Render ConfigurationGroupPropertiesInput */}
            <ConfigurationGroupPropertiesInput
                value={value}
                onChange={onChange}
                properties={[selectedProperty]}
            />
        </React.Fragment>
    );
}
