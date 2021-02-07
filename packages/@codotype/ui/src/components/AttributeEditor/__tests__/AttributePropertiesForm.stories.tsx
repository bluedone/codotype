import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { AttributePropertiesForm } from "../AttributePropertiesForm";
import { AttributeInput, EMPTY_TOKEN_CASING, Primatives } from "@codotype/core";

// // // //

storiesOf(
    "Components/ProjectEditor/AttributeEditor/AttributePropertiesForm",
    module,
).add("renders", () => {
    const [attributeInput, setAttributeInput] = React.useState<AttributeInput>(
        new Primatives.AttributeInput({}),
    );
    return (
        <Story>
            <AttributePropertiesForm
                attributeInput={attributeInput}
                onChange={updatedAttributeInput => {
                    setAttributeInput(updatedAttributeInput);
                }}
                onKeydownEnter={() => {
                    console.log("On keydown enter");
                }}
            />
        </Story>
    );
});
