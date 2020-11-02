import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RuntimeProvider } from "../component";
import { Story } from "../../Story";
import { dummyPluginMetadata } from "../../ProjectEditor/__tests__/test_state";
import { buildDefaultProjectInput } from "@codotype/core";

// // // //

const dummyProjectInput = buildDefaultProjectInput(dummyPluginMetadata);

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
                                        projectInput: dummyProjectInput,
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
