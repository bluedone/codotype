import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { GeneratorTypeTag } from "./GeneratorTypeTag";
import { GeneratorVersionTag } from "./GeneratorVersionTag";
import { GeneratorExperienceTag } from "./GeneratorExperienceTag";
import { GeneratorGithubLink } from "./GeneratorGithubLink";
import { GeneratorTechTag } from "./GeneratorTechTag";

// // // //

export function GeneratorListItem(props: { generator: PluginMetadata }) {
    const { generator } = props;
    return (
        <div className="card card-body border-light shadow-hover mb-2">
            <div className="row">
                <div className="col-lg-12 d-flex justify-content-between align-items-center">
                    <p className="lead mb-0 w-100 d-flex justify-content-between align-items-center">
                        <img
                            className="mr-2"
                            style={{ maxWidth: "2rem" }}
                            src={generator.icon}
                        />
                        {generator.label}

                        <GeneratorGithubLink generator={generator} />
                    </p>
                </div>
                <div className="col-lg-12 mt-2">
                    <p className="card-text mb-2">{generator.description}</p>
                </div>
                <div className="col-lg-12 d-flex justify-content-between align-items-center">
                    <span className="d-flex">
                        {generator.typeTags.map((tag: string) => (
                            <GeneratorTypeTag tag={tag} key={tag} />
                        ))}
                        {generator.techTags.map((tag: string) => (
                            <GeneratorTechTag tag={tag} key={tag} />
                        ))}
                        {/* <span className='badge badge-info' v-if="generator.self_configuring">Self-Configuring</span> */}
                    </span>

                    <span className="d-flex">
                        <GeneratorExperienceTag
                            experience={generator.experience}
                        />
                        <GeneratorVersionTag version={generator.version} />
                    </span>
                </div>
            </div>
        </div>
    );
}
