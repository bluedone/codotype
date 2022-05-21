import * as React from "react";
import { Listbox, Transition } from "@headlessui/react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck, faSort } from "@fortawesome/free-solid-svg-icons";
import {
    PropertyTypes,
    ConfigurationPropertyValue,
    SelectOption,
    ConfigurationProperty,
    applyStringPropertyTransformations,
    applyNumberPropertyTransformations,
    StringPropertyTransformations,
    NumberPropertyTransformations,
} from "@codotype/core";
import Switch from "react-switch";
import classnames from "classnames";
import { RadioGroup } from "@headlessui/react";
import { inputClassName } from "../Input/constants";

// // // //

interface ConfigurationInputPrimitiveProps {
    value: any;
    property: ConfigurationProperty;
    onChange: (updatedValue: ConfigurationPropertyValue) => void;
}

export default function DropdownMenu(props: ConfigurationInputPrimitiveProps) {
    const { value, property, onChange } = props;
    const { content } = property;

    const selectedOption:
        | undefined
        | SelectOption = property.selectOptions.find(o => o.value === value);

    return (
        <Listbox value={value} onChange={onChange}>
            {({ open }: { open: boolean }) => (
                <div className="mt-1 relative">
                    <Listbox.Button className="bg-white dark:bg-gray-900 relative w-full border border-gray-300 dark:border-gray-700 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-primary-500 sm:text-sm">
                        <span className="block truncate text-lg">
                            {selectedOption === undefined
                                ? content.label
                                : selectedOption.label}
                        </span>
                        <span className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                            <FontAwesomeIcon icon={faSort} />
                        </span>
                    </Listbox.Button>

                    <Transition
                        show={open}
                        as={React.Fragment}
                        leave="transition ease-in duration-100"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Listbox.Options
                            static
                            className="absolute z-10 mt-1 w-full bg-white dark:bg-gray-900 shadow-lg max-h-60 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm"
                        >
                            {property.selectOptions.map(option => (
                                <Listbox.Option
                                    key={option.value}
                                    className={({ active }) =>
                                        classnames(
                                            "cursor-default text-lg select-none relative py-2 pl-3 pr-9",
                                            {
                                                "text-gray-900 dark:text-gray-300": !active,
                                                "text-white dark:text-gray-200 bg-primary-600": active,
                                            },
                                        )
                                    }
                                    value={option.value}
                                >
                                    {({ selected, active }) => (
                                        <>
                                            <span
                                                className={classnames(
                                                    "block truncate",
                                                    {
                                                        "font-semibold": selected,
                                                        "font-normal": !selected,
                                                    },
                                                )}
                                            >
                                                {option.label}
                                            </span>

                                            {selected ? (
                                                <span
                                                    className={classnames(
                                                        "absolute inset-y-0 right-0 flex items-center pr-4",
                                                        {
                                                            "text-white": active,
                                                            "text-primary-600": !active,
                                                        },
                                                    )}
                                                >
                                                    <FontAwesomeIcon
                                                        icon={faCheck}
                                                    />
                                                </span>
                                            ) : null}
                                        </>
                                    )}
                                </Listbox.Option>
                            ))}
                        </Listbox.Options>
                    </Transition>
                </div>
            )}
        </Listbox>
    );
}

// // // //

export function RadioGroupInput(props: ConfigurationInputPrimitiveProps) {
    const { value, property, onChange } = props;
    const { content } = property;

    return (
        <RadioGroup value={value} onChange={onChange}>
            <RadioGroup.Label className="sr-only">
                {content.label}
            </RadioGroup.Label>
            <div className="space-y-4">
                {property.selectOptions.map(option => (
                    <RadioGroup.Option
                        key={option.value}
                        value={option.value}
                        className={({ active }) =>
                            classnames(
                                "relative block rounded-lg border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-900 shadow-sm px-6 py-4 cursor-pointer hover:border-gray-400 sm:flex sm:justify-between focus:outline-none",
                                {
                                    "ring-1 ring-indigo-500": active,
                                },
                            )
                        }
                    >
                        {({ checked }) => (
                            <>
                                <div className="flex items-center h-14">
                                    {option.icon !== undefined &&
                                        option.icon !== "" && (
                                            <div>
                                                <img
                                                    src={option.icon}
                                                    className="max-h-14 mr-4 p-1 rounded-sm"
                                                    draggable={false}
                                                />
                                            </div>
                                        )}
                                    <div className="flex flex-col">
                                        <div className="text-lg">
                                            <RadioGroup.Label
                                                as="p"
                                                className="font-medium text-gray-900 dark:text-gray-200"
                                            >
                                                {option.label}
                                            </RadioGroup.Label>
                                        </div>
                                        <div className="text-sm">
                                            <RadioGroup.Description
                                                as="div"
                                                className="text-gray-500 dark:text-gray-300"
                                            >
                                                <p className="sm:inline">
                                                    {option.description}
                                                </p>
                                            </RadioGroup.Description>
                                        </div>
                                    </div>
                                </div>
                                <div
                                    className={classnames(
                                        "absolute -inset-px rounded-lg border-2 pointer-events-none",
                                        {
                                            "border-primary-500": checked,
                                            "border-transparent": !checked,
                                        },
                                    )}
                                    aria-hidden="true"
                                />
                            </>
                        )}
                    </RadioGroup.Option>
                ))}
            </div>
        </RadioGroup>
    );
}

// // // //

export function ConfigurationInputPrimitive(
    props: ConfigurationInputPrimitiveProps,
) {
    const { property } = props;

    function setValue(updatedValue: ConfigurationPropertyValue) {
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
    let value = props.value;
    if (property.allowDisable) {
        value = props.value.value;
    }

    // // // //

    // Handle PropertyTypes.STRING
    if (property.type === PropertyTypes.STRING) {
        return (
            <input
                className={inputClassName}
                type="text"
                name={property.identifier}
                required={property.required}
                placeholder={property.content.label}
                autoComplete="none"
                value={value}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
                onBlur={e => {
                    const value = e.currentTarget.value;

                    // Applies PropertyFilters from ConfigurationProperty
                    const filteredValue: string = applyStringPropertyTransformations(
                        {
                            value,
                            transformations: property.transformations as StringPropertyTransformations[],
                        },
                    );

                    // Sets value with filtered version on blur
                    setValue(filteredValue);
                }}
            />
        );
    }

    // Handle PropertyTypes.NUMBER
    if (property.type === PropertyTypes.NUMBER) {
        return (
            <input
                className={inputClassName}
                type="number"
                placeholder={property.content.label}
                value={value}
                required={property.required}
                onChange={e => {
                    setValue(e.currentTarget.value);
                }}
                onBlur={e => {
                    const value = parseFloat(e.currentTarget.value);

                    // Return if value is NaN for some reason
                    if (Number.isNaN(value)) {
                        return;
                    }

                    // Applies PropertyFilters from ConfigurationProperty
                    const filteredValue: number = applyNumberPropertyTransformations(
                        {
                            value,
                            transformations: property.transformations as NumberPropertyTransformations[],
                        },
                    );

                    // Sets value with filtered version on blur
                    setValue(filteredValue);
                }}
            />
        );
    }

    // Handle PropertyTypes.BOOLEAN
    // TODO - replace with generic headless/ui component
    // https://headlessui.dev/react/switch
    if (property.type === PropertyTypes.BOOLEAN) {
        return (
            <Switch
                height={22}
                width={50}
                // onHandleColor={}
                // offHandleColor={}
                offColor={"#888"}
                // onColor={"#6366F1"}
                onColor={"#3b83f6"}
                checkedIcon={false}
                uncheckedIcon={false}
                onChange={(updatedChecked: boolean) => {
                    setValue(updatedChecked);
                }}
                checked={value}
            />
        );
    }

    // Handle PropertyTypes.DROPDOWN
    if (property.type === PropertyTypes.DROPDOWN) {
        return <DropdownMenu {...props} />;
    }

    // Handle PropertyTypes.RADIO_GROUP
    if (property.type === PropertyTypes.RADIO_GROUP) {
        return <RadioGroupInput {...props} />;
    }

    // FEATURE - add support for MULTI_DROPDOWN
    return null;
}
