import * as React from "react";
import { LocalRuntime } from "../LocalRuntime";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CodotypeStoryDecorator } from "../../../components/Story";

// // // //

export default {
    title: "Developer/Pages/LocalRuntime",
    component: LocalRuntime,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof LocalRuntime>;

const Template: ComponentStory<typeof LocalRuntime> = () => <LocalRuntime />;

// // // //

export const Render = Template.bind({});
