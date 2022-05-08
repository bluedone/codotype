import * as React from "react";
import { FaqItem } from "../FaqItemCard";
import { CodotypeStoryDecorator } from "../../../components/Story";
import { ComponentStory, ComponentMeta } from "@storybook/react";
import { FaqPage } from "../component";

// // // //

const faqItems: FaqItem[] = [
    {
        question: "What's Codotype?",
        answer: "<strong>Codotype</strong> is a framework for generating code.",
    },
    {
        question: "Can I contribute? ",
        answer:
            'Of course! We welcome contributions from anyone - please check out our <a href="https://github.com/codotype/codotype/blob/master/CONTRIBUTING.md" target="_blank">CONTRIBUTION</a> guide for details.',
    },
];

// // // //

export default {
    title: "Marketing/Pages/FAQ",
    component: FaqPage,
    parameters: {
        layout: "fullscreen",
    },
    decorators: [CodotypeStoryDecorator],
} as ComponentMeta<typeof FaqPage>;

const Template: ComponentStory<typeof FaqPage> = () => (
    <FaqPage faqItems={faqItems} />
);

// // // //

export const Render = Template.bind({});
