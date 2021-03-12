import * as React from "react";
import {
    ConfigurationGroup,
    GroupLayoutVariants,
    ConfigurationProperty,
} from "@codotype/core";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationInputPrimative } from "./ConfigurationInputPrimative";

// // // //

/**
 * ConfigurationGroupPropertiesDetail
 * TODO - add additional props
 * @param props.configurationGroup
 */
export function ConfigurationGroupPropertiesDetail(props: {
    configurationGroup: ConfigurationGroup;
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
        <div className="grid grid-cols-12">
            <div className={`col-span-${selectorColumn} border-right`}>
                <nav className="nav nav-pills flex-col">
                    {configurationGroup.properties.map(property => {
                        // Defines className for tab
                        // TODO - the bootstrap tabs + pills CSS isn't working correctly, should fix
                        const tabClassName: string[] = ["nav-link nav-item"];
                        if (property.identifier === selectedPropertyID) {
                            tabClassName.push("active bg-blue-500 text-white");
                        }

                        return (
                            <li className="nav-item">
                                <a
                                    className={tabClassName.join()}
                                    href={"#"}
                                    onClick={e => {
                                        e.preventDefault();
                                        e.stopPropagation();
                                        setSelectedPropertyID(
                                            property.identifier,
                                        );
                                    }}
                                >
                                    {property.content.label}
                                </a>
                            </li>
                        );
                    })}
                </nav>
            </div>
            <div className={`col-span-${detailColumn}`}>
                <div className="grid grid-cols-1">
                    <div className="col-span-1">
                        <ConfigurationInputFormGroup
                            property={selectedProperty}
                        >
                            <ConfigurationInputPrimative
                                property={selectedProperty}
                                value={true}
                                onChange={() => {
                                    // TODO - wire this up, must be finished
                                    // TODO - wire this up, must be finished
                                    // TODO - wire this up, must be finished
                                    console.log("changed");
                                }}
                            />
                        </ConfigurationInputFormGroup>
                    </div>
                </div>
            </div>
        </div>
    );
}