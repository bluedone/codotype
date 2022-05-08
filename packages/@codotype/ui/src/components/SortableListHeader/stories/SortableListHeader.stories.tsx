import * as React from "react";
import { SortableListHeader } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";
import { CodotypeStoryDecorator } from "../../Story";

// // // //

export default {
    title: "Components/SortableListHeader",
    component: SortableListHeader,
    args: {
        label: "Add Attributes",
        onClick: action("on-click"),
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof SortableListHeader>;

const Template: ComponentStory<typeof SortableListHeader> = args => (
    <SortableListHeader {...args} />
);

// // // //

export const Render = Template.bind({});
