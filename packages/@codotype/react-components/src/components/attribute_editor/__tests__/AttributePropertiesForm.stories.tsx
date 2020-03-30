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
                    required={false}
                    unique={false}
                    onLabelChange={(updatedLabel: string) => {
                        console.log(updatedLabel);
                    }}
                    onIdentifierChange={(updatedIdentifier: string) => {
                        console.log(updatedIdentifier);
                    }}
                    onRequiredChange={(updatedRequired: boolean) => {
                        console.log(updatedRequired);
                    }}
                    onUniqueChange={(updatedUnique: boolean) => {
                        console.log(updatedUnique);
                    }}
                />
            </Story>
        );
    },
);
