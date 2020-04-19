import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { Attribute } from "@codotype/types";
import { AttributeEditor } from "../component";
import {
    attributeExample01,
    attributeExample02,
    supportedDatatypes,
} from "./test_state";

// // // //

storiesOf("AttributeEditor/Layout", module).add("populated", () => {
    const [attributes, setAttributes] = React.useState<Attribute[]>([
        attributeExample01,
        attributeExample02,
    ]);
    return (
        <Story>
            <AttributeEditor
                attributes={attributes}
                supportedDatatypes={supportedDatatypes}
                onChange={(updatedAttributes: Attribute[]) => {
                    console.log("AttributeEditor - onChange");
                    console.log(updatedAttributes);
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

storiesOf("AttributeEditor/Layout", module).add("empty", () => {
    const [attributes, setAttributes] = React.useState<Attribute[]>([]);
    return (
        <Story>
            <AttributeEditor
                attributes={attributes}
                supportedDatatypes={supportedDatatypes}
                onChange={(updatedAttributes: Attribute[]) => {
                    console.log("AttributeEditor - onChange");
                    console.log(updatedAttributes);
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
