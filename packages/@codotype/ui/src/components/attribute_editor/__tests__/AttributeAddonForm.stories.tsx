import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../dev";
import { AttributeAddonForm } from "../AttributeAddonForm";
import { buildDefaultAddonValue } from "../component";
import {
    testState,
    Datatype,
    ATTRIBUTE_ADDON_UNIQUE,
    ATTRIBUTE_ADDON_REQUIRED,
    ATTRIBUTE_ADDON_NULLABLE,
    AttributeAddonValue,
    ATTRIBUTE_ADDON_PRIMARY_KEY,
} from "@codotype/core";

// // // //

storiesOf("ProjectEditor/AttributeEditor/AttributeAddonForm", module).add(
    "renders",
    () => {
        const [value, setValue] = React.useState<AttributeAddonValue>(
            buildDefaultAddonValue([
                ATTRIBUTE_ADDON_NULLABLE,
                ATTRIBUTE_ADDON_PRIMARY_KEY,
                ATTRIBUTE_ADDON_REQUIRED,
                ATTRIBUTE_ADDON_UNIQUE,
            ]),
        );
        return (
            <Story>
                <AttributeAddonForm
                    addons={[
                        {
                            ...ATTRIBUTE_ADDON_NULLABLE,
                            supportedDatatypes: [Datatype.BOOLEAN],
                        },
                        {
                            ...ATTRIBUTE_ADDON_PRIMARY_KEY,
                            supportedDatatypes: [Datatype.BOOLEAN],
                        },
                        {
                            ...ATTRIBUTE_ADDON_REQUIRED,
                            supportedDatatypes: [Datatype.BOOLEAN],
                        },
                        {
                            ...ATTRIBUTE_ADDON_UNIQUE,
                            supportedDatatypes: [Datatype.BOOLEAN],
                        },
                    ]}
                    attributeCollection={[
                        {
                            ...testState.emailAttribute,
                            addons: {
                                [ATTRIBUTE_ADDON_PRIMARY_KEY.identifier]: false,
                            },
                        },
                    ]}
                    attributeInput={{
                        ...testState.emailAttribute,
                        datatype: Datatype.BOOLEAN,
                        id: "",
                    }}
                    value={value}
                    onChange={(updatedValue: AttributeAddonValue) => {
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
