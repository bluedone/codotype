import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { RelationPropertiesForm } from "../RelationPropertiesForm";

// // // //

storiesOf("RelationEditor/RelationPropertiesForm", module).add(
    "renders",
    () => {
        return (
            <Story>
                <RelationPropertiesForm
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
