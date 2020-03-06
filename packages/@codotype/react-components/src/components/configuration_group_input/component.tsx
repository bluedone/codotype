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
        <div className="col-lg-6">
            <div className="form-group">
                <label htmlFor="">{props.property.label}</label>
                {props.children}
            </div>
        </div>
    );
};

interface ConfigurationInputChildProps {
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
                onChange={e => {
                    props.onChange(e.currentTarget.value);
                }}
            />
        );
    }
    if (props.property.type === OptionType.BOOLEAN) {
        return (
            <input
                type="checkbox"
                onChange={e => {
                    props.onChange(e.currentTarget.checked);
                }}
            />
        );
    }
    if (props.property.type === OptionType.DROPDOWN) {
        return (
            <select
                className="form-control"
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
                                        {/* {JSON.stringify(props.value, null, 4)} */}
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
        <div className="row">
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
                                    <div className="card card-body mb-4">
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
                                        <p>
                                            {/* //@ts-ignore */}
                                            {JSON.stringify(val)}
                                        </p>
                                    </div>
                                );
                            }

                            // Handle all simple inputs
                            return (
                                <ConfigurationInputFormGroup
                                    property={property}
                                >
                                    <ConfigurationInputChild
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
