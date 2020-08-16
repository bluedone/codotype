import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { FaqPage } from "../FaqPage";
import { FaqItem, FaqItemCard } from "../FaqItemCard";

// // // //

const faqItems: FaqItem[] = [
    {
        question: 'What\'s Codotype?',
        answer: '<strong>Codotype</strong> is a framework for generating code.'
    },
    {
        question: 'Can I contribute? ',
        answer: 'Of course! We welcome contributions from anyone - please check out our <a href="https://github.com/codotype/codotype/blob/master/CONTRIBUTING.md" target="_blank">CONTRIBUTION</a> guide for details.'
    }
]

storiesOf("Pages/Faq/Layout", module).add("renders", () => {
    return (
        <Story>
            <FaqPage faqItems={faqItems} />
        </Story>
    );
});

storiesOf("Pages/Faq/FaqItemCard", module).add("renders", () => {
    return (
        <Story>
            <FaqItemCard faqItem={faqItems[0]} />
        </Story>
    );
});
