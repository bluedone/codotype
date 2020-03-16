import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GeneratorMeta } from "../types";

// // // //

interface GeneratorStartProps {
    generator: GeneratorMeta;
    externalLink?: string;
    buildLink?: string;
}

/**
 * GeneratorStart
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `GeneratorStartProps`
 */
export function GeneratorStart(props: GeneratorStartProps) {
    return (
        <div className="row h-100 align-items-center">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        {/* <img style={{ maxWidth: "4rem !important" }} src={props.label.icon}/> */}
                        <h3 className="display-4">{props.generator.label}</h3>
                        <p className="lead text-muted">
                            powered by{" "}
                            <a target="_blank" href="https://codotype.org">
                                Codotype
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-12 d-flex justify-content-center">
                        {/* <gh-btns-star slug="codotype/codotype" show-count></gh-btns-star> */}
                        {/* GitHub Star Count */}
                        {/* <!-- Place this tag where you want the button to render. --> */}
                        <a
                            className="github-button"
                            href="https://github.com/sponsors/ntkme"
                            data-icon="octicon-heart"
                            aria-label="Sponsor @ntkme on GitHub"
                        >
                            Sponsor
                        </a>

                        {/* <!-- Place this tag where you want the button to render. --> */}
                        <a
                            href="https://github.com/codotype/codotype"
                            data-icon="octicon-star"
                            data-size="large"
                            data-show-count="true"
                            aria-label="Star codotype/codotype on GitHub"
                            className="github-button"
                        >
                            Star
                        </a>
                    </div>
                </div>

                {/* <FontAwesomeIcon icon={faPlus} /> */}

                <div className="row mt-3">
                    <div className="col-lg-12 text-center">
                        <p className="lead">{props.generator.description}</p>
                    </div>
                </div>

                <div className="row justify-content-center">
                    <div className="col-lg-4 col-md-6 col-sm-8 text-center">
                        {props.buildLink && (
                            <button className="btn btn-block btn-primary btn-lg rounded-pill">
                                Let's build something
                                {/* <ChevronAnimation active :svg="svg" /> */}
                            </button>
                        )}

                        {props.externalLink && (
                            <button
                                // v-if="externalLink"
                                // :href="externalLink"
                                className="btn btn-block btn-primary btn-lg rounded-pill"
                            >
                                Let's build something
                                {/* <ChevronAnimation active :svg="svg" /> */}
                            </button>
                        )}
                    </div>
                </div>

                <div className="row row justify-content-center mt-3">
                    <div className="col-lg-12 d-flex justify-content-center align-items-center">
                        {/* <GeneratorTechTag v-for="tag in model.tech_tags" :key="tag" :tag="tag" /> */}
                        Meh
                    </div>

                    <div className="col-lg-12 d-flex justify-content-center align-items-center mt-2">
                        {/* <GeneratorTypeTag v-for="tag in model.type_tags" :key="tag" :tag="tag" /> */}
                        {/* <GeneratorVersionTag :model="model" /> */}
                        {/* <span class='badge badge-info' v-if="model.self_configuring">Self-Configuring</span> */}
                        Content
                    </div>
                </div>
            </div>
        </div>
    );
}

// import GeneratorTypeTag from './GeneratorTypeTag'
// import GeneratorTechTag from './GeneratorTechTag'
// import GeneratorVersionTag from './GeneratorVersionTag'
// import ChevronAnimation from '../../../components/ChevronAnimation'

// export default {
//   props: {
//     model: {
//       required: true
//     },
//     buildLink: {
//       type: String
//     },
//     externalLink: {
//       type: String
//     },
//     svg: {
//       type: Boolean
//     }
//   },
//   components: {
//     GeneratorTypeTag,
//     GeneratorTechTag,
//     GeneratorVersionTag,
//     ChevronAnimation
//   }
// } */}
