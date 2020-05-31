import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GeneratorStart } from "../component";
import { Story } from "@src/components/dev";
import { dummyGeneratorMeta } from "@src/components/project_editor/__tests__/test_state";

// // // //

storiesOf("Components/GeneratorStart", module).add("renders in card", () => {
    return (
        <Story>
            <div className="card card-body">
                <GeneratorStart
                    externalLink={"https://google.com"}
                    generator={dummyGeneratorMeta}
                />
            </div>
        </Story>
    );
});

storiesOf("Components/GeneratorStart", module).add("renders", () => {
    return (
        <Story>
            <GeneratorStart
                buildLink={"https://google.com"}
                generator={dummyGeneratorMeta}
            />
        </Story>
    );
});
