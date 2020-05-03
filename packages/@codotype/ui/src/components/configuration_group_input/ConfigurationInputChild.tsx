import * as React from "react";
import {
    OptionType,
    OptionValue,
    DropdownOption,
    ConfigurationGroupProperty,
} from "@codotype/types";
import Switch from "react-switch";

// // // //

interface ConfigurationInputChildProps {
    value: any; // TODO - remove any here
    property: ConfigurationGroupProperty;
    onChange: (updatedValue: OptionValue) => void;
}

export function ConfigurationInputChild(props: ConfigurationInputChildProps) {
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
}
