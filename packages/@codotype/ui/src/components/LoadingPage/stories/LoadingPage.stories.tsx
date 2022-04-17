import * as React from "react";
import { CodotypeStoryDecorator } from "../../Story";
import { LoadingPage } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/LoadingPage",
    component: LoadingPage,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof LoadingPage>;

const Template: ComponentStory<typeof LoadingPage> = () => <LoadingPage />;

// // // //

export const Render = Template.bind({});
