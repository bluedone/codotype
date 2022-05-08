import * as React from "react";
import { CodotypeStoryDecorator } from "../../../components/Story";
import { PluginListPage } from "../component";
import { testState } from "@codotype/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Marketing/Pages/PluginList",
    component: PluginListPage,
    args: {
        plugins: [testState.cdkPluginMeta, testState.dummyPluginMetadata],
    },
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof PluginListPage>;

const Template: ComponentStory<typeof PluginListPage> = args => (
    <PluginListPage {...args} />
);
