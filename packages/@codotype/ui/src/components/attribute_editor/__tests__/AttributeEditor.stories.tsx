import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../dev";
import { Attribute, AttributeInput } from "@codotype/core";
import { AttributeEditor } from "../component";
import {
    attributeExample01,
    attributeExample02,
    supportedDatatypes,
} from "./test_state";

// // // //

storiesOf("ProjectEditor/AttributeEditor/Layout", module).add(
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
                <pre className="bg-dark px-4 py-4 rounded mt-4 text-light">
                    {JSON.stringify(attributes, null, 4)}
                </pre>
            </Story>
        );
    },
);

storiesOf("ProjectEditor/AttributeEditor/Layout", module).add("empty", () => {
    const [attributes, setAttributes] = React.useState<AttributeInput[]>([]);
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
            <pre className="bg-dark px-4 py-4 rounded mt-4 text-light">
                {JSON.stringify(attributes, null, 4)}
            </pre>
        </Story>
    );
});
