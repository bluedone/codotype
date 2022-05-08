import * as React from "react";
import { LoadingBuild } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/LoadingBuild",
    component: LoadingBuild,
} as ComponentMeta<typeof LoadingBuild>;

const Template: ComponentStory<typeof LoadingBuild> = args => <LoadingBuild />;

// // // //

export const Render = Template.bind({});
