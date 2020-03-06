import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout schemas={[]} />
        </Story>
    );
});
