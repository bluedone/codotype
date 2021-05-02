import * as React from "react";
import classnames from "classnames"
import {
    ConfigurationGroup,
    GroupLayoutVariants,
    ConfigurationProperty,
    ConfigurationPropertyDict,
} from "@codotype/core";
import { ConfigurationGroupPropertiesInput } from "./ConfigurationGroupPropertiesInput";

// // // //

/**
 * ConfigurationGroupPropertiesDetail
 * @param props.configurationGroup
 */
export function ConfigurationGroupPropertiesDetail(props: {
    configurationGroup: ConfigurationGroup;
    value: ConfigurationPropertyDict;
    onChange: (updatedVal: ConfigurationPropertyDict) => void;
}) {
    const { configurationGroup } = props;

    // Sets selectedPropertyID
    const firstProperty: ConfigurationProperty | undefined =
        configurationGroup.properties[0];

    // Return null if firstProperty is undefined
    if (firstProperty === undefined) {
        return null;
    }

    // Set selectedPropertyID
    const [selectedPropertyID, setSelectedPropertyID] = React.useState(
        firstProperty.identifier,
    );

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

    // Get column spans based on `ConfigurationGroup.layoutVariant`
    let selectorColumn: number = 3;
    let detailColumn: number = 9;
    if (configurationGroup.layoutVariant === GroupLayoutVariants.DETAIL_4x8) {
        selectorColumn = 4;
        detailColumn = 8;
    } else if (
        configurationGroup.layoutVariant === GroupLayoutVariants.DETAIL_6x6
    ) {
        selectorColumn = 6;
        detailColumn = 6;
    }

    return (
        <div className="grid grid-cols-12 gap-4">
            <div className={`col-span-${selectorColumn} border-right`}>
                <nav className="space-y-1 mt-3">
                    {configurationGroup.properties.map(property => {
                        const active = property.identifier === selectedPropertyID;
                        return (
                            <button className={classnames('flex items-center w-full px-3 py-2 text-sm font-medium rounded-md focus:outline-none', {
                                'bg-gray-200 text-gray-900': active,
                                'text-gray-600 hover:text-gray-900': active,
                            })}
                                onClick={e => {
                                    e.preventDefault();
                                    e.stopPropagation();
                                    setSelectedPropertyID(
                                        property.identifier,
                                    );
                                }}
                            >
                                {property.content.label}
                            </button>
                        );
                    })}
                </nav>
            </div>
            <div className={`col-span-${detailColumn}`}>
                <div className="grid grid-cols-1">
                    <div className="col-span-1">
                        <ConfigurationGroupPropertiesInput
                            value={props.value}
                            onChange={props.onChange}
                            properties={[selectedProperty]}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
