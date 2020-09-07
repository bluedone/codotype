import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RuntimeProvider } from "../component";
import { Story } from "../../dev";
import { dummyGeneratorMeta } from "../../project_editor/__tests__/test_state";
import { buildDefaultProject } from "@codotype/core";

// // // //

const dummyProject = buildDefaultProject(dummyGeneratorMeta);

// // // //

storiesOf("RuntimeProvider", module).add("active = true", () => {
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
                                        generator: dummyGeneratorMeta,
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
