import * as React from "react";
import { MarkdownRenderer } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import {
    pluginReadme,
    xssMarkdown,
    markdownHeaders,
    image01,
    syntaxHighlighting,
} from "./test_state";

// // // //

export default {
    title: "Components/MarkdownRenderer",
    component: MarkdownRenderer,
    args: {
        source: pluginReadme,
    },
    parameters: {
        layout: "centered",
    },
} as ComponentMeta<typeof MarkdownRenderer>;

const Template: ComponentStory<typeof MarkdownRenderer> = args => (
    <MarkdownRenderer {...args} />
);

// // // //

export const Render = Template.bind({});
export const XSSMarkdown = Template.bind({});
XSSMarkdown.args = {
    source: xssMarkdown,
};

export const Headers = Template.bind({});
Headers.args = {
    source: markdownHeaders,
};

export const Image = Template.bind({});
Image.args = {
    source: image01,
};

export const SyntaxHighlighting = Template.bind({});
SyntaxHighlighting.args = {
    source: syntaxHighlighting,
};
