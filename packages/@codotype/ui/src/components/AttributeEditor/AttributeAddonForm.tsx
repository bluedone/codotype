import * as React from "react";
import Switch from "react-switch";
import { FormGroup } from "./FormGroup";
import {
    AddonsValue,
    AddonProperty,
    PropertyTypes,
    AttributeInput,
    DropdownOption,
    AttributeAddon,
} from "@codotype/core";

// // // //

// TODO - this is broken and must be fixed + updated to support RelationAddon as well (split into two separate components)
export function AddonPropertyForm(props: {
    attributeCollection: AttributeInput[];
    addons: AttributeAddon[];
    value: AddonsValue;
    attributeInput: AttributeInput;
    onChange: (updatedValue: AddonsValue) => void;
}) {
    const { attributeCollection, attributeInput, addons } = props;
    const { datatype } = attributeInput;

    // If datatype is not selected, return null
    if (datatype === null) {
        return null;
    }

    // Return null if no addons are defined
    if (addons.length === 0) {
        return null;
    }

    // Return null if there aren't any addons that support the current datatype
    if (!addons.some(a => a.supportedDatatypes.includes(datatype))) {
        return null;
    }

    return (
        <div className="grid grid-cols-12 mt-3">
            {addons
                .map(a => a.property)
                .map((a: AddonProperty) => {
                    // Return null if datatype is not supported
                    if (
                        !addons.some(a =>
                            a.supportedDatatypes.includes(datatype),
                        )
                    ) {
                        return null;
                    }

                    // Define boolean indicating whether or not the addon field is disabled
                    let disableInput = false;
                    if (
                        a.exclusive &&
                        attributeCollection.some(attr => {
                            // Skip if we're editing an attribute that already exists in the collection
                            if (attr.id === attributeInput.id) {
                                return false;
                            }

                            // Pulls the Addon value from the attribute
                            const av = attr.addons[a.identifier];

                            // Disable input IFF addon is exclusive + defined elsewhere
                            return (
                                (typeof av === "boolean" && av !== false) ||
                                (typeof av === "string" && av !== "")
                            );
                        })
                    ) {
                        // Disable if addon.exclusive && addon is already defined elsewhere
                        disableInput = true;
                    }

                    if (a.propertyType === PropertyTypes.BOOLEAN) {
                        // Form for boolean addon
                        const addonValue: boolean = new Boolean(
                            props.value[a.identifier],
                        ).valueOf();

                        return (
                            <div className="col-span-6">
                                <FormGroup
                                    label={a.content.label}
                                    help={a.content.description}
                                >
                                    <Switch
                                        height={22}
                                        width={50}
                                        disabled={disableInput}
                                        // onHandleColor={}
                                        // offHandleColor={}
                                        offColor={"#888"}
                                        onColor={"#4582ec"}
                                        checkedIcon={false}
                                        uncheckedIcon={false}
                                        onChange={(updatedChecked: boolean) => {
                                            props.onChange({
                                                ...props.value,
                                                [a.identifier]: updatedChecked,
                                            });
                                        }}
                                        checked={addonValue}
                                    />
                                </FormGroup>
                            </div>
                        );
                    }

                    // Dropdown
                    if (a.propertyType === PropertyTypes.DROPDOWN) {
                        // Form for boolean addon
                        const addonValue = String(props.value[a.identifier]);

                        return (
                            <div className="col-span-6">
                                <FormGroup
                                    label={a.content.label}
                                    help={a.content.description}
                                >
                                    <select
                                        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
                                        value={addonValue}
                                        onChange={e => {
                                            props.onChange({
                                                ...props.value,
                                                [a.identifier]:
                                                    e.currentTarget.value,
                                            });
                                        }}
                                    >
                                        {!a.required && <option></option>}
                                        {a.dropdownOptions.map(
                                            (d: DropdownOption) => {
                                                return (
                                                    <option
                                                        value={d.value}
                                                        key={d.value}
                                                    >
                                                        {d.label}
                                                    </option>
                                                );
                                            },
                                        )}
                                    </select>
                                </FormGroup>
                            </div>
                        );
                    }

                    // Return null (non-boolean option types coming later)
                    return null;
                })}
        </div>
    );
}
