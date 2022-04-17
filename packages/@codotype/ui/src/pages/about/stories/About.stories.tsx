import * as React from "react";
import { CodotypeStoryDecorator } from "../../../components/Story";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { AboutPageLayout } from "../component";

// // // //

export default {
    title: "Marketing/Pages/About",
    component: AboutPageLayout,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof AboutPageLayout>;

const Template: ComponentStory<typeof AboutPageLayout> = () => (
    <AboutPageLayout />
);

// // // //

export const Render = Template.bind({});
