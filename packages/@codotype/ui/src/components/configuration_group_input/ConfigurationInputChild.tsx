import * as React from "react";
import {
    OptionType,
    OptionValue,
    DropdownOption,
    ConfigurationGroupProperty,
} from "@codotype/core";
import Switch from "react-switch";

// // // //

interface ConfigurationInputChildProps {
    value: any; // TODO - remove any here
    property: ConfigurationGroupProperty;
    onChange: (updatedValue: OptionValue) => void;
}

// TODO - rename `ConfigurationInputChild` to `ConfigurationInputPrimative`
export function ConfigurationInputChild(props: ConfigurationInputChildProps) {
    const { property } = props;

    // TODO - remove this after enabled/value obj is enforced everywhere
    function setValue(updatedValue: OptionValue) {
        if (property.allowDisable) {
            props.onChange({
                enabled: props.value.enabled,
                value: updatedValue,
            });
            return;
        }
        props.onChange(updatedValue);
    }

    // Pulls value from props.value
    // TODO - remove this after enabled/value obj is enforced everywhere
    let value = props.value;
    if (property.allowDisable) {
        value = props.value.value;
    }

    // // // //

    // Handle OptionType.STRING
    if (property.type === OptionType.STRING) {
        return (
            <input
                className="form-control"
                type="text"
                placeholder={property.label}
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
            />
        );
    }

    // Handle OptionType.NUMBER
    if (property.type === OptionType.NUMBER) {
        // TODO - add INTEGER
        return (
            <input
                className="form-control"
                type="number"
                placeholder={property.label}
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
            />
        );
    }

    // Handle OptionType.BOOLEAN
    if (property.type === OptionType.BOOLEAN) {
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
                    setValue(updatedChecked);
                }}
                checked={value}
            />
        );
    }

    // Handle OptionType.DROPDOWN
    if (property.type === OptionType.DROPDOWN) {
        return (
            <select
                className="form-control"
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
            >
                {property.required && (
                    <option value="">{property.label}</option>
                )}
                {property.dropdownOptions.map((d: DropdownOption) => {
                    return (
                        <option key={d.value} value={d.value}>
                            {d.label}
                        </option>
                    );
                })}
            </select>
        );
    }

    // TODO - throw error if OptionType dropdown is not handled
    // TODO - add support for MULTI_DROPDOWN
    return null;
}
