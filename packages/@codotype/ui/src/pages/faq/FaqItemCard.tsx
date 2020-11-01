import * as React from "react";

// // // //

export interface FaqItem {
    question: string;
    answer: string;
}

interface FaqItemProps {
    faqItem: FaqItem;
}

export function FaqItemCard({ faqItem }: FaqItemProps) {
    return (
        <div className="card card-body border-light shadow-sm mb-3">
            <div className="row">
                <div className="col col-sm-12">
                    <p className="lead mb-0 w-100">{faqItem.question}</p>
                </div>
                <div className="col-sm-12 mt-2">
                    <p
                        className="card-text mb-2"
                        dangerouslySetInnerHTML={{ __html: faqItem.answer }}
                    />
                </div>
            </div>
        </div>
    );
}
