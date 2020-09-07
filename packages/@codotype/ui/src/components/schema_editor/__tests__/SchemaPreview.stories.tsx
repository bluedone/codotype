import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaPreview } from "../SchemaPreview";
import { Story } from "../../dev";
import { userSchema } from "../../relation_editor/__tests__/test_state";

// // // //

storiesOf("Components/SchemaPreview", module).add("renders", () => {
    return (
        <Story>
            <SchemaPreview schema={userSchema} schemas={[]} />
        </Story>
    );
});
