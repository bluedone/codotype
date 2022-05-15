import * as React from "react";
import { CodotypeStoryDecorator } from "../../../components/Story";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { PreviewBrowser } from "../component";
import { PREVIEW_BROWSER_RESPONSE } from "./test_state";

// // // //

export default {
    title: "Components/PreviewBrowser",
    component: PreviewBrowser,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof PreviewBrowser>;

const Template: ComponentStory<typeof PreviewBrowser> = () => (
    <PreviewBrowser files={PREVIEW_BROWSER_RESPONSE.files} />
);

// // // //

export const Render = Template.bind({});
