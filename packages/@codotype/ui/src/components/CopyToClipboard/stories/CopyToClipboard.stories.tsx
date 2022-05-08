import { ComponentStory, ComponentMeta } from "@storybook/react";
import React from "react";
import { CopyToClipboard } from "../component";
import { action } from "@storybook/addon-actions";

// // // //

export default {
    title: "Components/CopyToClipboard",
    component: CopyToClipboard,
} as ComponentMeta<typeof CopyToClipboard>;

const Template: ComponentStory<typeof CopyToClipboard> = args => (
    <CopyToClipboard {...args} onCopy={action("copied-to-clipboard")}>
        {({ copyToClipboard }) => (
            <button
                onClick={() => {
                    copyToClipboard("Copy this to clipboard");
                }}
            >
                Copy to clipboard
            </button>
        )}
    </CopyToClipboard>
);

export const Render = Template.bind({});
