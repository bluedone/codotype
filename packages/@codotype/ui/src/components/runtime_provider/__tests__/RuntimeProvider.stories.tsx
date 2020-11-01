import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RuntimeProvider } from "../component";
import { Story } from "../../dev";
import { dummyPluginMetadata } from "../../project_editor/__tests__/test_state";
import { buildDefaultProject } from "@codotype/core";

// // // //

const dummyProject = buildDefaultProject(dummyPluginMetadata);

// // // //

storiesOf("Util/RuntimeProvider", module).add("active = true", () => {
    return (
        <Story>
            <RuntimeProvider>
                {({ loading, generateCode }) => {
                    // Render ProjectEditor here
                    return (
                        <div>
                            <button
                                disabled={loading}
                                onClick={() => {
                                    generateCode({
                                        generator: dummyPluginMetadata,
                                        project: dummyProject,
                                    });
                                }}
                            >
                                Generate Code
                            </button>
                        </div>
                    );
                }}
            </RuntimeProvider>
        </Story>
    );
});
