import React from "react";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { MoreInfoLink } from "../component";

// // // //

export default {
    title: "Components/MoreInfoLink",
    component: MoreInfoLink,
    args: {
        url: "https://google.com",
    },
    parameters: {
        layout: "centered",
    },
} as ComponentMeta<typeof MoreInfoLink>;

const Template: ComponentStory<typeof MoreInfoLink> = args => (
    <MoreInfoLink {...args} />
);

// // // //

export const Render = Template.bind({});
