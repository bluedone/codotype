import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { GeneratorMeta } from "@codotype/core";
import { ChevronAnimation } from "../chevron_animation/component";
import { MarkdownRenderer } from "../markdown_renderer";
import { GeneratorTypeTag } from "../generator_card/GeneratorTypeTag";
import { GeneratorTechTag } from "../generator_card/GeneratorTechTag";
import { GeneratorExperienceTag } from "../generator_card/GeneratorExperienceTag";
import { GeneratorVersionTag } from "../generator_card/GeneratorVersionTag";
import { GeneratorGithubLink } from "../generator_card/GeneratorGithubLink";

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
                        <h3 className="display-4 mt-3">
                            {props.generator.label}
                        </h3>
                        <p className="lead text-muted">
                            powered by{" "}
                            <a target="_blank" href="https://codotype.io">
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
                                <ChevronAnimation active />
                            </button>
                        )}

                        {props.externalLink && (
                            <button
                                // v-if="externalLink"
                                // :href="externalLink"
                                className="btn btn-block btn-primary btn-lg rounded-pill"
                            >
                                Let's build something
                                <ChevronAnimation active />
                            </button>
                        )}
                    </div>
                </div>

                <div className="row d-flex flex-row justify-content-center mt-3">
                    <div className="col-lg-12 d-flex justify-content-center align-items-center">
                        {props.generator.techTags.map(tag => (
                            <GeneratorTechTag key={tag} tag={tag} />
                        ))}
                    </div>

                    <div className="col-lg-12 d-flex justify-content-center align-items-center mt-2">
                        {props.generator.typeTags.map(tag => (
                            <GeneratorTypeTag key={tag} tag={tag} />
                        ))}
                        <GeneratorExperienceTag
                            experience={props.generator.experience}
                        />
                        <GeneratorVersionTag
                            version={props.generator.version}
                        />
                        <GeneratorGithubLink generator={props.generator} />
                    </div>
                </div>

                <div className="row d-flex justify-content-center my-3">
                    <div className="col-lg-8">
                        <hr />
                    </div>
                </div>

                <div className="row d-flex justify-content-center">
                    <div className="col-lg-10">
                        <MarkdownRenderer
                            source={props.generator.documentation}
                        />
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
