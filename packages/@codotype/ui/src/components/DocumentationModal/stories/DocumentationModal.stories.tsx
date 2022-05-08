import * as React from "react";
import { DocumentationModal } from "../component";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { CodotypeStoryDecorator } from "../../Story";

// // // //

export default {
    title: "Components/DocumentationModal",
    component: DocumentationModal,
    args: {
        header: "Documentation",
        documentation: "# Hello! ",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof DocumentationModal>;

const Template: ComponentStory<typeof DocumentationModal> = args => (
    <DocumentationModal {...args} />
);

// // // //

export const Render = Template.bind({});
