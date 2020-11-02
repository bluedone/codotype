import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "../../Story";
import { buildDefaultProjectInput, testState } from "@codotype/core";
const { cdkPluginMeta } = testState;

// // // //

storiesOf("ProjectEditor/SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout
                schemas={[]}
                projectInput={buildDefaultProjectInput(cdkPluginMeta)}
                pluginMetadata={cdkPluginMeta}
                onChange={updatedSchemas => {
                    console.log("onChange");
                    console.log(updatedSchemas);
                }}
                onChangeRelations={updatedRelations => {
                    console.log("onChangeRelations");
                    console.log(updatedRelations);
                }}
            />
        </Story>
    );
});
