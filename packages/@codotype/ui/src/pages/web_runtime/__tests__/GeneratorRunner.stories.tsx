import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/dev";
import { PluginRunner } from "../GeneratorRunner";
import { buildDefaultProject, testState } from "@codotype/core";
const { cdkPluginMetadata } = testState;

// // // //

storiesOf("Util/GeneratorRunner", module).add("loads", () => {
    const project = buildDefaultProject(cdkPluginMetadata);
    return (
        <Story>
            <PluginRunner generator={cdkPluginMetadata}>
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
            </PluginRunner>
        </Story>
    );
});
