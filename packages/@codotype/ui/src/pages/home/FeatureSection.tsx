import * as React from "react";

// // // //

export interface FeatureSection {
    title: string;
    body: string;
    imgSrc?: string;
    alignRight?: boolean;
}

/**
 * FeatureSections
 */
export function FeatureSections(props: { featureSections: FeatureSection[] }) {
    const { featureSections } = props;

    return (
        <div className="section bg-white py-3">
            <div className="container">
                {featureSections.map((f, index) => (
                    <div
                        key={f.title}
                        className={`row items-center mt-5 ${
                            index % 2 === 1 ? "flex-row-reverse" : ""
                        }`}
                    >
                        <div className="col-sm-4">
                            <div className="flex items-start">
                                <div className="flex-1">
                                    <h3 className="mt-0">{f.title}</h3>
                                    <p>{f.body}</p>
                                </div>
                            </div>
                        </div>

                        <div className="col-sm-8">
                            <img
                                src={f.imgSrc}
                                alt="image"
                                className="img-fluid shadow-lg rounded-sm my-5"
                                draggable={false}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
