import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "../../Story";
import { buildDefaultProjectInput, testState } from "@codotype/core";
const { cdkPluginMeta } = testState;

// // // //

storiesOf("Components/ProjectEditor/SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout
                projectInput={buildDefaultProjectInput(cdkPluginMeta)}
                pluginMetadata={cdkPluginMeta}
                onChange={updatedProjectInput => {
                    console.log("onChange");
                    console.log(updatedProjectInput);
                }}
            />
        </Story>
    );
});
