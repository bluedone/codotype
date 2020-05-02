import * as React from "react";
import Switch from "react-switch";
import { FormGroup } from "./FormGroup";
import {
    AttributeAddonValue,
    AttributeAddon,
    Attribute,
    OptionType,
    Datatype,
} from "@codotype/types";
import { AttributeInput } from "./AttributeFormModal";

// // // //

export function AttributeAddonForm(props: {
    attributeCollection: Attribute[];
    addons: AttributeAddon[];
    value: AttributeAddonValue;
    attributeInput: AttributeInput;
    onChange: (updatedValue: AttributeAddonValue) => void;
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
        <div className="row">
            {addons.map((a: AttributeAddon) => {
                // Return null if datatype is not supported
                if (!a.supportedDatatypes.includes(datatype)) {
                    return null;
                }

                // Define boolean indicating whether or not the addon field is disabled
                let disableInput: boolean = false;
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

                if (a.propertyType === OptionType.BOOLEAN) {
                    // Form for boolean addon
                    const addonValue: boolean = new Boolean(
                        props.value[a.identifier],
                    ).valueOf();

                    return (
                        <div className="col-lg-6 col-sm-12">
                            <FormGroup label={a.label} help={a.description}>
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

                // Return null (non-boolean option types coming later)
                return null;
            })}
        </div>
    );
}
