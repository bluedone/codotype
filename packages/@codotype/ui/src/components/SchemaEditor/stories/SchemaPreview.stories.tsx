import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaPreview } from "../SchemaPreview";
import { Story } from "../../Story";
import { buildDefaultProjectInput, testState } from "@codotype/core";
const { userSchema } = testState;

// // // //

storiesOf("Components/SchemaPreview", module).add("renders", () => {
    return (
        <Story>
            <SchemaPreview
                schemaInput={userSchema}
                projectInput={buildDefaultProjectInput(testState.cdkPluginMeta)}
            />
        </Story>
    );
});
