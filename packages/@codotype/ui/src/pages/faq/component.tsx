import * as React from "react";
import { FaqItem, FaqItemCard } from "./FaqItemCard";

// // // //

interface FaqPageProps {
    faqItems: FaqItem[];
}

export function FaqPage({ faqItems }: FaqPageProps) {
    return (
        <div className="row mt-3 mb-5">
            <div className="col col-sm-12">
                <h2 className="mb-0">FAQs</h2>
                <p className="text-muted">
                    You've got questions - we have answers.
                </p>
            </div>

            <div className="col col-sm-12">
                {faqItems.map(fi => (
                    <FaqItemCard faqItem={fi} />
                ))}
            </div>
        </div>
    );
}
