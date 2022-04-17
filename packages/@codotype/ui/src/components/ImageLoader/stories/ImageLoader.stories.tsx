import * as React from "react";
import { ImageLoader } from "../component";
import { CodotypeStoryDecorator } from "../../Story";
import { ComponentMeta, ComponentStory } from "@storybook/react";

// // // //

export default {
    title: "Components/ImageLoader",
    component: ImageLoader,
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof ImageLoader>;

const Template: ComponentStory<typeof ImageLoader> = args => (
    <ImageLoader {...args} />
);

// // // //

export const Render = Template.bind({});
export const Fallback = Template.bind({});
Fallback.args = {
    src: "foobar",
};
