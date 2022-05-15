import * as React from "react";
import { buildDefaultProjectInput } from "@codotype/core";
import { CodotypeStoryDecorator } from "../../../components/Story";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PluginPreviewFetcher } from "../PluginPreviewFetcher";
import { PreviewBrowser } from "../../../components/PreviewBrowser";
import { NextJsWebsiteStarterPluginVariant } from "./test_state";

// // // //

export default {
    title: "Util/PluginPreviewFetcher",
    component: PluginPreviewFetcher,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof PluginPreviewFetcher>;

NextJsWebsiteStarterPluginVariant;
const projectInput = buildDefaultProjectInput(
    NextJsWebsiteStarterPluginVariant,
);

const Template: ComponentStory<typeof PluginPreviewFetcher> = () => (
    <PluginPreviewFetcher projectInput={projectInput}>
        {({ loading, error, files }) => {
            return (
                <div className="card card-body">
                    <pre>{JSON.stringify({ loading, error }, null, 4)}</pre>
                    <PreviewBrowser files={files} />
                </div>
            );
        }}
    </PluginPreviewFetcher>
);

// // // //

export const Render = Template.bind({});
