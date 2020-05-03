import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { AttributePropertiesForm } from "../AttributePropertiesForm";

// // // //

storiesOf("AttributeEditor/AttributePropertiesForm", module).add(
    "renders",
    () => {
        return (
            <Story>
                <AttributePropertiesForm
                    label={""}
                    identifier={"string"}
                    onLabelChange={(updatedLabel: string) => {
                        console.log(updatedLabel);
                    }}
                />
            </Story>
        );
    },
);
