import * as React from "react";
import { SortableListEmpty } from "../component";
import { CodotypeStoryDecorator } from "../../Story";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { action } from "@storybook/addon-actions";

// // // //

export default {
    title: "Components/SortableListEmpty",
    component: SortableListEmpty,
    args: {
        title: "Attributes",
        body: "Add attributes to your data model",
        cta: "Add attributes to your data model",
        onClick: action("on-click"),
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof SortableListEmpty>;

const Template: ComponentStory<typeof SortableListEmpty> = args => (
    <SortableListEmpty {...args} />
);

// // // //

export const Render = Template.bind({});
