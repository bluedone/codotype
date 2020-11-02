import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../dev";
import { AddonPropertyForm } from "../AttributeAddonForm";
import {
    testState,
    Datatypes,
    buildDefaultAddonsValue,
    AddonsValue,
    // ATTRIBUTE_ADDON_UNIQUE,
    // ATTRIBUTE_ADDON_REQUIRED,
    // ATTRIBUTE_ADDON_NULLABLE,
    // ATTRIBUTE_ADDON_PRIMARY_KEY,
} from "@codotype/core";

// // // //

storiesOf("ProjectEditor/AttributeEditor/AttributeAddonForm", module).add(
    "renders",
    () => {
        const [value, setValue] = React.useState<AddonsValue>(
            buildDefaultAddonsValue({
                properties: [...Object.values(testState.addonProperties)],
            }),
        );
        return (
            <Story>
                <AddonPropertyForm
                    addons={[
                        {
                            property: testState.addonProperties.nullable,
                            supportedDatatypes: [Datatypes.BOOLEAN],
                        },
                        {
                            property: testState.addonProperties.primaryKey,
                            supportedDatatypes: [Datatypes.BOOLEAN],
                        },
                        {
                            property: testState.addonProperties.required,
                            supportedDatatypes: [Datatypes.BOOLEAN],
                        },
                        {
                            property: testState.addonProperties.unique,
                            supportedDatatypes: [Datatypes.BOOLEAN],
                        },
                    ]}
                    attributeCollection={[
                        {
                            ...testState.emailAttribute,
                            addons: {
                                [testState.addonProperties.unique
                                    .identifier]: false,
                            },
                        },
                    ]}
                    attributeInput={{
                        ...testState.emailAttribute,
                        datatype: Datatypes.BOOLEAN,
                        id: "",
                    }}
                    value={value}
                    onChange={(updatedValue: AddonsValue) => {
                        setValue(updatedValue);
                    }}
                />
                <pre className="px-3 py-3 rounded bg-dark text-light">
                    {JSON.stringify(value, null, 4)}
                </pre>
            </Story>
        );
    },
);
