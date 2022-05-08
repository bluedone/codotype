import * as React from "react";
import { CodotypeStoryDecorator } from "../../Story";
import { GitHubStar } from "../GitHubStar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Components/GitHubStar",
    component: GitHubStar,
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof GitHubStar>;

const Template: ComponentStory<typeof GitHubStar> = () => <GitHubStar />;

// // // //

export const Render = Template.bind({});
