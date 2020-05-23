import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { GeneratorRunner } from "../GeneratorRunner";
import { testState } from "@codotype/types";
import { buildDefaultProject } from "@codotype/util";
const { cdkGeneratorMeta } = testState;

// // // //

storiesOf("GeneratorRunner", module).add("loads", () => {
    const project = buildDefaultProject(cdkGeneratorMeta);
    return (
        <Story>
            <GeneratorRunner generator={cdkGeneratorMeta}>
                {({ generateCode }) => {
                    return (
                        <div className="card card-body">
                            <button
                                onClick={() => {
                                    generateCode({
                                        project,
                                    });
                                }}
                            >
                                Generate Code
                            </button>
                        </div>
                    );
                }}
            </GeneratorRunner>
        </Story>
    );
});
