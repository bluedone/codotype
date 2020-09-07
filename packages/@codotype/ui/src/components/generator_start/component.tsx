import * as React from "react";
import { GeneratorMeta } from "@codotype/core";
import { ChevronAnimation } from "../chevron_animation/component";
import { MarkdownRenderer } from "../markdown_renderer";
import { GeneratorTypeTag } from "../generator_card/GeneratorTypeTag";
import { GeneratorTechTag } from "../generator_card/GeneratorTechTag";
import { GeneratorExperienceTag } from "../generator_card/GeneratorExperienceTag";
import { GeneratorVersionTag } from "../generator_card/GeneratorVersionTag";
import { GeneratorGithubLink } from "../generator_card/GeneratorGithubLink";
import { GitHubStar } from "../GitHubStar";

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
                        <img
                            style={{ maxWidth: "4rem !important" }}
                            src={props.generator.icon}
                        />
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
                        <GitHubStar />
                    </div>
                </div>

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
