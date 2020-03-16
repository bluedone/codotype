import React, { FunctionComponent } from "react";
import "./styles.scss";
import {
    OptionType,
    OptionValue,
    OptionValueInstance,
    DropdownOption,
    ConfigurationGroupProperty,
    ConfigurationGroup,
} from "../types";
import { MoreInfoLink } from "../more_info_link";

// // // //

/**
 * buildConfigurationGroupPropertyValue
 * Accepts a single ConfigurationGroupProperty and recursively produces its associated OptionValue instance
 * @param property - the single ConfigurationGroupProperty for which the OptionValue is being produced
 */
export function buildConfigurationGroupPropertyValue(
    property: ConfigurationGroupProperty,
): OptionValue {
    if (property.type === OptionType.STRING) {
        return property.defaultValue || "";
    }
    if (property.type === OptionType.BOOLEAN) {
        return property.defaultValue || false;
    }
    if (property.type === OptionType.DROPDOWN) {
        return property.defaultValue || "";
    }
    if (property.type === OptionType.COLLECTION) {
        return [buildConfigurationGroupValue(property.properties)];
        // Should return this:
        // return [];
    }
    if (property.type === OptionType.INSTANCE) {
        return buildConfigurationGroupValue(property.properties);
    }
    return "";
}

/**
 * buildConfigurationGroupValue
 * Builds the top-level OptionValueInstance for a single ConfigurationGroup
 * @param properties - array of ConfigurationGroupProperty
 */
export function buildConfigurationGroupValue(
    properties: ConfigurationGroupProperty[],
): OptionValueInstance {
    const initialValue: OptionValueInstance = {};

    // Defines empty ConfigurationGroupValue
    // Iterates over each property in the group and assigns values
    const configurationGroupValue: any = properties.reduce(
        (val, property: ConfigurationGroupProperty) => {
            // Updates val with data for ConfigurationGroupProperty
            if (property.allowDisable && !property.required) {
                val[property.identifier] = {
                    enabled: property.enabled,
                    value: buildConfigurationGroupPropertyValue(property),
                };
            } else {
                val[property.identifier] = buildConfigurationGroupPropertyValue(
                    property,
                );
            }
            // Returns val
            return val;
        },
        initialValue, // Passes in empty OptionValueInstance
    );

    // Returns ConfigurationGroupValue
    return configurationGroupValue;
}

// // // //

interface ConfigurationInputFormGroupProps {
    property: ConfigurationGroupProperty;
    children: React.ReactNode;
}
export const ConfigurationInputFormGroup: FunctionComponent<ConfigurationInputFormGroupProps> = (
    props: ConfigurationInputFormGroupProps,
) => {
    return (
        <div className="col-lg-12">
            {/* <div className="col-lg-6"> */}
            <div className="card shadow-sm my-2 py-3 px-3">
                {/* <div className="form-group mb-0"> */}
                <div className="form-group mb-0">
                    <div className="d-flex align-items-center">
                        <div className="d-flex align-items-center">
                            {props.property.icon && (
                                <img
                                    src={props.property.icon}
                                    style={{ maxWidth: "2rem" }}
                                    className="mr-2"
                                />
                            )}
                            <label className="mb-0">
                                {props.property.label}
                            </label>
                            <small className="mx-3">
                                <MoreInfoLink url="https://github.com" />
                            </small>
                            {/* <small>Switch Goes Here</small> */}
                        </div>

                        {props.property.type === OptionType.BOOLEAN && (
                            <div className="d-flex align-items-center">
                                {props.children}
                            </div>
                        )}
                    </div>

                    {/* Render description IFF not empty */}
                    {props.property.description !== "" && (
                        <small className="d-block mt-2 text-muted">
                            {props.property.description}
                        </small>
                    )}

                    {/* Render empty description warning */}
                    {props.property.description === "" && (
                        <small className="d-block mt-2 mb-2 text-danger">
                            Warning - this input needs a description
                        </small>
                    )}

                    {/* Renders props.children */}
                    {props.property.type !== OptionType.BOOLEAN && (
                        <React.Fragment>{props.children}</React.Fragment>
                    )}
                </div>
            </div>
        </div>
    );
};

// // // // //

import Switch from "react-switch";

interface ConfigurationInputChildProps {
    value: any; // TODO - remove any here
    property: ConfigurationGroupProperty;
    onChange: (updatedValue: OptionValue) => void;
}
export const ConfigurationInputChild: FunctionComponent<ConfigurationInputChildProps> = (
    props: ConfigurationInputChildProps,
) => {
    if (props.property.type === OptionType.STRING) {
        return (
            <input
                className="form-control"
                type="text"
                placeholder={props.property.label}
                value={props.value}
                onChange={e => {
                    props.onChange(e.currentTarget.value);
                }}
            />
        );
    }
    if (props.property.type === OptionType.NUMBER) {
        // TODO - add INTEGER
        return (
            <input
                className="form-control"
                type="number"
                placeholder={props.property.label}
                value={props.value}
                onChange={e => {
                    props.onChange(e.currentTarget.value);
                }}
            />
        );
    }
    if (props.property.type === OptionType.BOOLEAN) {
        return (
            <Switch
                height={22}
                width={50}
                // onHandleColor={}
                // offHandleColor={}
                offColor={"#888"}
                onColor={"#4582ec"}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={(updatedChecked: boolean) => {
                    props.onChange(updatedChecked);
                }}
                checked={props.value}
            />
        );
        // return (
        //     <input
        //         type="checkbox"
        //         checked={props.value}
        //         onChange={e => {
        //             props.onChange(e.currentTarget.checked);
        //         }}
        //     />
        // );
    }
    if (props.property.type === OptionType.DROPDOWN) {
        return (
            <select
                className="form-control"
                value={props.value}
                onChange={e => {
                    props.onChange(e.currentTarget.value);
                }}
            >
                {props.property.required && (
                    <option value="">{props.property.label}</option>
                )}
                {props.property.dropdownOptions.map((d: DropdownOption) => {
                    return <option value={d.value}>{d.label}</option>;
                })}
            </select>
        );
    }

    // TODO - throw error if OptionType dropdown is not handled
    return null;
};

// // // //

interface ConfigurationInstanceInputProps {
    properties: ConfigurationGroupProperty[];
    label: string;
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}
export const ConfigurationInstanceInput: FunctionComponent<ConfigurationInstanceInputProps> = (
    props: ConfigurationInstanceInputProps,
) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <p className="lead mb-0">{props.label}</p>
                <div className="row">
                    {props.properties.map(
                        (property: ConfigurationGroupProperty) => {
                            // if (property.type === OptionType.COLLECTION) {
                            //     return (
                            //         <div className="card card-body mb-4">
                            //             <ConfigurationInstanceInput
                            //                 label={property.label}
                            //                 properties={property.properties}
                            //                 onChange={(
                            //                     updatedVal: OptionValue,
                            //                 ) => {
                            //                     props.onChange({
                            //                         // ...props.value,
                            //                         [property.identifier]: updatedVal,
                            //                     });
                            //                 }}
                            //                 value={props.value}
                            //             />
                            //         </div>
                            //     );
                            // }

                            if (property.type === OptionType.INSTANCE) {
                                return (
                                    <div className="card card-body mb-4">
                                        <ConfigurationInstanceInput
                                            label={property.label}
                                            properties={property.properties}
                                            onChange={(
                                                updatedVal: OptionValue,
                                            ) => {
                                                props.onChange({
                                                    // @ts-ignore
                                                    ...props.value.value,
                                                    [property.identifier]: {
                                                        enabled: true,
                                                        value: updatedVal,
                                                    },
                                                    // ...updatedVal,
                                                });
                                            }}
                                            value={
                                                // @ts-ignore
                                                props.value.value[
                                                    property.identifier
                                                ]
                                            }
                                        />
                                        {JSON.stringify(
                                            // @ts-ignore
                                            props.value.value[
                                                property.identifier
                                            ].value,
                                            null,
                                            4,
                                        )}
                                    </div>
                                );
                            }

                            // TODO - handle nested instance + collection
                            return (
                                <ConfigurationInputFormGroup
                                    property={property}
                                >
                                    <ConfigurationInputChild
                                        value={null}
                                        property={property}
                                        onChange={(
                                            updatedValue: OptionValue,
                                        ) => {
                                            props.onChange({
                                                // @ts-ignore
                                                ...props.value.value,
                                                [property.identifier]: updatedValue,
                                            });
                                        }}
                                    />
                                    <pre>
                                        {JSON.stringify(props.value, null, 4)}
                                    </pre>
                                </ConfigurationInputFormGroup>
                            );
                        },
                    )}
                    {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
                </div>
            </div>
        </div>
    );
};

// // // //

interface ConfigurationInputProps {
    value: OptionValueInstance;
    configurationGroup: ConfigurationGroup;
    onChange: (updatedVal: OptionValueInstance) => void;
}
export const ConfigurationInput: FunctionComponent<ConfigurationInputProps> = (
    props: ConfigurationInputProps,
) => {
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                {/* ConfigurationGroupHeader */}
                <div className="row">
                    <div className="col-sm-12">
                        <span className="d-flex align-items-center">
                            <p className="lead mb-0 mr-3">
                                {props.configurationGroup.label}
                            </p>
                            {/* <br className="d-none d-sm-block d-md-none" /> */}
                            {/* <MoreInfoLink : url="url"/> */}
                            <small className="ml-2 text-muted">
                                {props.configurationGroup.description}
                            </small>
                        </span>
                        <hr />
                    </div>
                </div>

                {/* Render inputs for ConfigurationGroup.properties */}
                <div className="row">
                    {props.configurationGroup.properties.map(
                        (property: ConfigurationGroupProperty) => {
                            if (property.type === OptionType.COLLECTION) {
                                // return (
                                //     <div className="card card-body mb-4">
                                //         <ConfigurationInstanceInput
                                //             label={property.label}
                                //             properties={property.properties}
                                //             onChange={(
                                //                 updatedVal: OptionValue,
                                //             ) => {
                                //                 props.onChange({
                                //                     ...props.value,
                                //                     // [property.identifier]: updatedVal,
                                //                 });
                                //             }}
                                //             value={props.value}
                                //         />
                                //     </div>
                                // );
                                return null;
                            }

                            // Handle instance input
                            if (property.type === OptionType.INSTANCE) {
                                // @ts-ignore
                                const val = props.value[property.identifier];
                                return (
                                    <div
                                        className="card card-body mb-4 mt-2 mx-2"
                                        key={property.identifier}
                                    >
                                        <ConfigurationInstanceInput
                                            label={property.label}
                                            properties={property.properties}
                                            onChange={(
                                                updatedVal: OptionValueInstance,
                                            ) => {
                                                if (property.allowDisable) {
                                                    props.onChange({
                                                        ...props.value,
                                                        [property.identifier]: {
                                                            enabled: true,
                                                            value: updatedVal,
                                                        },
                                                    });
                                                } else {
                                                    props.onChange({
                                                        ...props.value,
                                                        [property.identifier]: updatedVal,
                                                    });
                                                }
                                            }}
                                            value={val}
                                        />
                                        {/* <p>{property.identifier}</p> */}
                                        {/* <p>{JSON.stringify(property)}</p> */}
                                        {/* Debugging */}
                                        {JSON.stringify(val)}
                                    </div>
                                );
                            }

                            // Handle all simple inputs
                            // @ts-ignore
                            const value = props.value[property.identifier];
                            return (
                                <ConfigurationInputFormGroup
                                    property={property}
                                    key={property.identifier}
                                >
                                    <ConfigurationInputChild
                                        value={value}
                                        property={property}
                                        onChange={(
                                            updatedValue: OptionValue,
                                        ) => {
                                            props.onChange({
                                                ...props.value,
                                                [property.identifier]: updatedValue,
                                            });
                                        }}
                                    />
                                    {/* Debugging */}
                                    {/* {JSON.stringify(props.value)} */}
                                </ConfigurationInputFormGroup>
                            );
                        },
                    )}
                    {/* <pre>{JSON.stringify(val, null, 4)}</pre> */}
                    {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
                </div>
            </div>
        </div>
    );
};
