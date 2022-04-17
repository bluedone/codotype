import * as React from "react";
import { RuntimeProvider } from "../component";
import { CodotypeStoryDecorator } from "../../Story";
import { dummyPluginMetadata } from "../../ProjectEditor/__tests__/test_state";
import { buildDefaultProjectInput } from "@codotype/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

const dummyProjectInput = buildDefaultProjectInput(dummyPluginMetadata);

export default {
    title: "Util/RuntimeProvider",
    component: RuntimeProvider,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof RuntimeProvider>;

const Template: ComponentStory<typeof RuntimeProvider> = args => (
    <RuntimeProvider>
        {({ loading, generateCode }) => {
            // Render ProjectEditor here
            return (
                <div>
                    <button
                        disabled={loading}
                        onClick={() => {
                            generateCode({
                                plugin: dummyPluginMetadata,
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
);

// // // //

export const Render = Template.bind({});
