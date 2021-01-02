import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { Attribute, AttributeInput } from "@codotype/core";
import { AttributeEditor } from "../component";
import {
    attributeExample01,
    attributeExample02,
    supportedDatatypes,
} from "./test_state";

// // // //

storiesOf("Components/ProjectEditor/AttributeEditor/Layout", module).add(
    "populated",
    () => {
        const [attributes, setAttributes] = React.useState<AttributeInput[]>([
            attributeExample01,
            attributeExample02,
        ]);
        return (
            <Story>
                <AttributeEditor
                    attributes={attributes}
                    addons={[]}
                    supportedDatatypes={supportedDatatypes}
                    onChange={(updatedAttributes: AttributeInput[]) => {
                        setAttributes(updatedAttributes);
                    }}
                />

                <hr />
                <pre className="bg-gray-800 px-4 py-4 rounded mt-4 text-light">
                    {JSON.stringify(attributes, null, 4)}
                </pre>
            </Story>
        );
    },
);

storiesOf("Components/ProjectEditor/AttributeEditor/Layout", module).add(
    "empty",
    () => {
        const [attributes, setAttributes] = React.useState<AttributeInput[]>(
            [],
        );
        return (
            <Story>
                <AttributeEditor
                    attributes={attributes}
                    addons={[]}
                    supportedDatatypes={supportedDatatypes}
                    onChange={(updatedAttributes: AttributeInput[]) => {
                        setAttributes(updatedAttributes);
                    }}
                />

                <hr />
                <pre className="bg-gray-800 px-4 py-4 rounded mt-4 text-light">
                    {JSON.stringify(attributes, null, 4)}
                </pre>
            </Story>
        );
    },
);
