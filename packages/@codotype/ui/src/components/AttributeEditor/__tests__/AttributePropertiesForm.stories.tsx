import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { AttributePropertiesForm } from "../AttributePropertiesForm";
import { EMPTY_TOKEN_CASING } from "@codotype/core";

// // // //

storiesOf("ProjectEditor/AttributeEditor/AttributePropertiesForm", module).add(
    "renders",
    () => {
        return (
            <Story>
                <AttributePropertiesForm
                    tokenCasing={{ ...EMPTY_TOKEN_CASING }}
                    onKeydownEnter={() => {
                        console.log("On keydown enter");
                    }}
                    onChange={updatedTokenCasing => {
                        console.log(updatedTokenCasing);
                    }}
                />
            </Story>
        );
    },
);
