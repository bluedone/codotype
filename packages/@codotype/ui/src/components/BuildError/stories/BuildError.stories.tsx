import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { BuildError } from "../component";
import { CodotypeStoryDecorator } from "../../Story";

// // // //

export default {
    title: "Components/BuildError",
    component: BuildError,
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof BuildError>;

const Template: ComponentStory<typeof BuildError> = () => <BuildError />;

// // // //

export const Render = Template.bind({});
