import * as React from "react";
import {
    ConfigurationGroup,
    GroupLayoutVariant,
    ConfigurationGroupProperty,
} from "@codotype/core";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";
import { ConfigurationInputChild } from "./ConfigurationInputChild";

// // // //

/**
 * ConfigurationGroupPropertiesDetail
 * @param props.configurationGroup
 */
export function ConfigurationGroupPropertiesDetail(props: {
    configurationGroup: ConfigurationGroup;
}) {
    const { configurationGroup } = props;

    // Sets selectedPropertyID
    const firstProperty: ConfigurationGroupProperty | undefined =
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
        | ConfigurationGroupProperty
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
    if (configurationGroup.layoutVariant === GroupLayoutVariant.DETAIL_4x8) {
        selectorColumn = 4;
        detailColumn = 8;
    } else if (
        configurationGroup.layoutVariant === GroupLayoutVariant.DETAIL_6x6
    ) {
        selectorColumn = 6;
        detailColumn = 6;
    }

    return (
        <div className="row">
            <div className={`col-lg-${selectorColumn} border-right`}>
                <nav className="nav nav-pills flex-column">
                    {configurationGroup.properties.map(property => {
                        // Defines className for tab
                        // TODO - the bootstrap tabs + pills CSS isn't working correctly, should fix
                        const tabClassName: string[] = ["nav-link nav-item"];
                        if (property.identifier === selectedPropertyID) {
                            tabClassName.push("active bg-primary text-white");
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
                                    {property.label}
                                </a>
                            </li>
                        );
                    })}
                </nav>
            </div>
            <div className={`col-lg-${detailColumn}`}>
                <div className="row">
                    <div className="col-lg-12">
                        <ConfigurationInputFormGroup
                            property={selectedProperty}
                        >
                            <ConfigurationInputChild
                                property={selectedProperty}
                                value={true}
                                onChange={() => {
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
