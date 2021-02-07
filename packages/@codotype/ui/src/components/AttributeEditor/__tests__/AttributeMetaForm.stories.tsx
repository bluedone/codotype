import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { AttributeMetaForm } from "../AttributeMetaForm";

// // // //

storiesOf(
    "Components/ProjectEditor/AttributeEditor/AttributeMetaForm",
    module,
).add("renders", () => {
    return (
        <Story>
            <AttributeMetaForm>
                <p>Addon Form Goes Here</p>
            </AttributeMetaForm>
        </Story>
    );
});
