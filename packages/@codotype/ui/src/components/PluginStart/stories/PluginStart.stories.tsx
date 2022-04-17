import * as React from "react";
import { PluginStart } from "../component";
import { CodotypeStoryDecorator } from "../../Story";
import { dummyPluginMetadata } from "../../ProjectEditor/stories/test_state";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/PluginStart",
    component: PluginStart,
    args: {
        plugin: dummyPluginMetadata,
    },
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof PluginStart>;

const Template: ComponentStory<typeof PluginStart> = args => (
    <PluginStart {...args} />
);

// // // //

export const Render = Template.bind({});

export const WithBuildLink = Template.bind({});
WithBuildLink.args = {
    buildLink: "https://google.com",
};

export const WithExternalLink = Template.bind({});
WithExternalLink.args = {
    externalLink: "https://google.com",
};
