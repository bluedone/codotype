import * as React from "react";
import { PageNotFound } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CodotypeStoryDecorator } from "../../Story";

// // // //

export default {
    title: "Components/PageNotFound",
    component: PageNotFound,
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof PageNotFound>;

const Template: ComponentStory<typeof PageNotFound> = () => <PageNotFound />;

// // // //

export const Render = Template.bind({});
