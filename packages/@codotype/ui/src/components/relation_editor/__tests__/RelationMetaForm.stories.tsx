import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { RelationMetaForm } from "../RelationMetaForm";

// // // //

storiesOf("RelationEditor/RelationMetaForm", module).add("renders", () => {
    const [description, setDescription] = React.useState("");
    return (
        <Story>
            <RelationMetaForm
                description={description}
                onDescriptionChange={setDescription}
            />
        </Story>
    );
});
