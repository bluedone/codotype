import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { ChevronAnimation } from "../ChevronAnimation/component";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { PluginTypeTag } from "../PluginCard/PluginTypeTag";
import { PluginTechTag } from "../PluginCard/PluginTechTag";
import { PluginExperienceTag } from "../PluginCard/PluginExperienceTag";
import { PluginsVersionTag } from "../PluginCard/PluginVersionTag";
import { PluginGithubLink } from "../PluginCard/PluginGithubLink";
import { GitHubStar } from "../GitHubStar";

// // // //

interface PluginStartProps {
    plugin: PluginMetadata;
    externalLink?: string;
    buildLink?: string;
}

/**
 * PluginStart
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `PluginStartProps`
 */
export function PluginStart(props: PluginStartProps) {
    return (
        <div className="row h-100 items-center">
            <div className="col-lg-12">
                <div className="row">
                    <div className="col-lg-12 text-center">
                        <img
                            style={{ maxWidth: "4rem !important" }}
                            src={props.plugin.content.icon}
                        />
                        <h3 className="display-4 mt-3">
                            {props.plugin.content.label}
                        </h3>
                        <p className="lead text-muted">
                            powered by{" "}
                            <a target="_blank" href="https://codotype.io">
                                Codotype
                            </a>
                        </p>
                    </div>

                    <div className="col-lg-12 d-flex justify-center">
                        <GitHubStar />
                    </div>
                </div>

                <div className="row mt-3">
                    <div className="col-lg-12 text-center">
                        <p className="lead">
                            {props.plugin.content.description}
                        </p>
                    </div>
                </div>

                <div className="row justify-center">
                    <div className="col-lg-4 col-md-6 col-sm-8 text-center">
                        {props.buildLink && (
                            <button className="btn btn-block btn-primary btn-lg rounded-pill">
                                Let's build something
                                <ChevronAnimation active />
                            </button>
                        )}

                        {props.externalLink && (
                            <button
                                // :href="externalLink"
                                className="btn btn-block btn-primary btn-lg rounded-pill"
                            >
                                Let's build something
                                <ChevronAnimation active />
                            </button>
                        )}
                    </div>
                </div>

                <div className="row d-flex flex-row justify-center mt-3">
                    <div className="col-lg-12 d-flex justify-center items-center">
                        {props.plugin.techTags.map(tag => (
                            <PluginTechTag key={tag} tag={tag} />
                        ))}
                    </div>

                    <div className="col-lg-12 d-flex justify-center items-center flex-wrap mt-2">
                        {props.plugin.typeTags.map(tag => (
                            <PluginTypeTag key={tag} tag={tag} />
                        ))}
                        <PluginExperienceTag
                            experience={props.plugin.experience}
                        />
                        <PluginsVersionTag version={props.plugin.version} />
                        <PluginGithubLink plugin={props.plugin} />
                    </div>
                </div>

                <div className="row d-flex justify-center my-3">
                    <div className="col-lg-8">
                        <hr />
                    </div>
                </div>

                <div className="row d-flex justify-center">
                    <div className="col-lg-10">
                        <MarkdownRenderer
                            source={props.plugin.content.documentation}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
}
