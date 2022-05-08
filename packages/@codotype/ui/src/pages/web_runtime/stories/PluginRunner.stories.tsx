import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/Story";
import { PluginRunner } from "../PluginRunner";
import { buildDefaultProjectInput, testState } from "@codotype/core";
const { cdkPluginMeta } = testState;

// // // //

storiesOf("Util/PluginRunner", module).add("loads", () => {
    const projectInput = buildDefaultProjectInput(cdkPluginMeta);
    return (
        <Story>
            <PluginRunner plugin={cdkPluginMeta}>
                {({ generateCode }) => {
                    return (
                        <div className="card card-body">
                            <button
                                onClick={() => {
                                    generateCode({
                                        projectInput,
                                    });
                                }}
                            >
                                Generate Code
                            </button>
                        </div>
                    );
                }}
            </PluginRunner>
        </Story>
    );
});
