import * as React from "react";
import { BuildFinished } from "../component";
import { CodotypeStoryDecorator } from "../../Story";
import { ResponseTypes } from "@codotype/core";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// // // //

export default {
    title: "Components/BuildFinished",
    component: BuildFinished,
    args: {
        responseType: ResponseTypes.s3,
        filepath: "https://google.com",
        onClickBackToEditor: action("on-click-back-to-editor"),
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof BuildFinished>;

const Template: ComponentStory<typeof BuildFinished> = args => (
    <BuildFinished {...args} />
);

// // // //

export const S3Download = Template.bind({});
export const LocalPath = Template.bind({});
LocalPath.args = {
    responseType: ResponseTypes.local,
    filepath: "/foo/bar/codotype-build/project",
};
