import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout
                schemas={[]}
                onChange={updatedSchemas => {
                    console.log("Updated Schemas");
                    console.log(updatedSchemas);
                }}
            />
        </Story>
    );
});
