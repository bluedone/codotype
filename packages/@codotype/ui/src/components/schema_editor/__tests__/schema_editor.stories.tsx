import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SchemaEditorLayout } from "../component";
import { Story } from "@src/components/dev";
import { cdkGeneratorMeta } from "@src/components/__tests__/test_state";

// // // //

storiesOf("SchemaEditor", module).add("renders", () => {
    return (
        <Story>
            <SchemaEditorLayout
                schemas={[]}
                generatorMeta={cdkGeneratorMeta}
                onChange={updatedSchemas => {
                    console.log("Updated Schemas");
                    console.log(updatedSchemas);
                }}
            />
        </Story>
    );
});
