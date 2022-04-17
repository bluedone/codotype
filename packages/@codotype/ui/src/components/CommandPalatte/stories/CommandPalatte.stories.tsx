import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CommandPalatte } from "../component";
import { CodotypeStoryDecorator } from "../../Story";

// // // //

export default {
    title: "Components/CommandPalatte",
    component: CommandPalatte,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof CommandPalatte>;

const Template: ComponentStory<typeof CommandPalatte> = () => (
    <CommandPalatte />
);

// // // //

export const Render = Template.bind({});
