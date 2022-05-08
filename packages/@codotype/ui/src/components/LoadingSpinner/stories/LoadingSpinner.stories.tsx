import * as React from "react";
import { LoadingSpinner } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/LoadingSpinner",
    component: LoadingSpinner,
    parameters: {
        layout: "centered",
    },
} as ComponentMeta<typeof LoadingSpinner>;

const Template: ComponentStory<typeof LoadingSpinner> = () => (
    <LoadingSpinner />
);

// // // //

export const Render = Template.bind({});
