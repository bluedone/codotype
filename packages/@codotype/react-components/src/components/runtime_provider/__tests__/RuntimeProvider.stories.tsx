import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RuntimeProvider } from "../component";
import { Story } from "@src/components/dev";
import { dummyGeneratorMeta } from "../../project_editor/__tests__/test_state";
import { buildDefaultProject } from "../../project_editor/buildDefaultProject";
import { BuildFinished } from "@src/components/build_finished/component";
import { LoadingBuild } from "@src/components/loading_build";

// // // //

const dummyProject = buildDefaultProject(dummyGeneratorMeta);

// // // //

storiesOf("RuntimeProvider", module).add("active = true", () => {
    return (
        <Story>
            <RuntimeProvider>
                {({ loading, finished, generateCode, reset }) => {
                    // Handle loading state
                    if (loading) {
                        return <LoadingBuild />;
                    }

                    // Handle finsihed state
                    if (finished) {
                        return (
                            <React.Fragment>
                                <BuildFinished
                                    responseType="LOCAL_PATH"
                                    filepath="/home/aeksco/code"
                                    // TODO - pass in RESET prop here
                                />
                                <button disabled={loading} onClick={reset}>
                                    Reset
                                </button>
                            </React.Fragment>
                        );
                    }

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
