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
                        className={`row align-items-center mt-5 ${
                            index % 2 === 1 ? "flex-row-reverse" : ""
                        }`}
                    >
                        <div className="col-sm-4">
                            <div className="media">
                                <div className="media-body">
                                    <div className="media-icon mb-3">
                                        {/* <font-awesome-icon */}
                                        {/* :icon="[f.fontAwesomePrefix, f.fontAwesomeIcon]" */}
                                        {/* className="text-primary" */}
                                        {/* size="2x" */}
                                        {/* /> */}
                                    </div>
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
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

///////////

// @import '@/assets/sass/main.sass';
// .browser-window {
//   display: inline-block;
//   text-align: left;
//   min-height: 200px;
//   max-width: 100%;
//   border-radius: 5px;
//   background-color: #f1f3f5;
//   box-shadow: 0 19px 38px rgba(137, 149, 199, 0.15),
//     0 15px 12px rgba(137, 149, 199, 0.08);
//   margin-bottom: 60px;
//   overflow: hidden;
//   &.limit-height {
//     max-height: 500px;
//   }
//   .top-bar {
//     height: 40px;
//     border-radius: 5px 5px 0 0;
//     border-top: thin solid #f1f3f5;
//     border-bottom: thin solid #f1f3f5;
//     background: rgb(248, 250, 255);
//     width: 100%;
//   }
//   .circle {
//     height: 13px;
//     width: 13px;
//     margin-right: 5px;
//     display: inline-block;
//     border-radius: 50%;
//     background-color: #fff;
//   }
//   .circles {
//     margin: 12px 12px;
//   }
//   .content {
//     display: inline-block;
//     margin: 0;
//     border-radius: 0 0 5px 5px;
//     background-color: #fafafa;
//     max-height: 500px;
//   }
//   .content img {
//     max-width: 100%;
//     height: auto;
//   }
//   .circle-red {
//     background: #fbbbf5;
//   }
//   .circle-yellow {
//     background: #f8e397;
//   }
//   .circle-blue {
//     background: #79cfd5;
//   }
// }

// .cast-shadow {
//   border-radius: 10px;
//   box-shadow: 0px 9px 68px 0px rgba(62, 57, 107, 0.2);
// }

// .media-icon i {
//   min-width: 50px;
//   color: $blue;
// }

// .color-icon i {
//   color: $blue;
// }
