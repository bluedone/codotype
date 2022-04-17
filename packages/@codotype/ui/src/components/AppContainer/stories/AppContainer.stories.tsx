import * as React from "react";
import { AppContainer } from "../component";
import { NextJsWebsiteStarterPlugin } from "../../../pages/web_runtime/stories/test_state";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/AppContainer",
    component: AppContainer,
    args: {
        plugin: NextJsWebsiteStarterPlugin,
    },
} as ComponentMeta<typeof AppContainer>;

const Template: ComponentStory<typeof AppContainer> = args => (
    <AppContainer {...args}>
        <p>Plugin Component Goes Here</p>
    </AppContainer>
);

// // // //

export const Render = Template.bind({});
