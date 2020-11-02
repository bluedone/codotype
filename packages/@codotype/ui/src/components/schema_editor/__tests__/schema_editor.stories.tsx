import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "../../dev";
import { testState } from "@codotype/core";
const { cdkPluginMeta } = testState;

// // // //

storiesOf("ProjectEditor/SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout
                schemas={[]}
                pluginMetadata={cdkPluginMeta}
                onChange={updatedSchemas => {
                    console.log("Updated Schemas");
                    console.log(updatedSchemas);
                }}
            />
        </Story>
    );
});
