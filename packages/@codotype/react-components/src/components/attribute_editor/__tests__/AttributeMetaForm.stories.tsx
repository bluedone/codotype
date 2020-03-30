import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { AttributeMetaForm } from "../AttributeMetaForm";

// // // //

storiesOf("AttributeEditor/AttributeMetaForm", module).add("renders", () => {
    const [description, setDescription] = React.useState("");
    return (
        <Story>
            <AttributeMetaForm
                description={description}
                onDescriptionChange={setDescription}
            />
        </Story>
    );
});
