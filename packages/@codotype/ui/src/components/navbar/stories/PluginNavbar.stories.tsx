import * as React from "react";
import { PluginNavbar } from "../PluginNavbar";
import { NextJsWebsiteStarterPluginVariant } from "../../../pages/web_runtime/stories/test_state";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/PluginNavbar",
    component: PluginNavbar,
    args: {
        plugin: NextJsWebsiteStarterPluginVariant,
    },
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof PluginNavbar>;

const Template: ComponentStory<typeof PluginNavbar> = args => (
    <PluginNavbar {...args} />
);

// // // //

export const Render = Template.bind({});
