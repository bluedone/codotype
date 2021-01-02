import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { PluginTypeTag } from "./PluginTypeTag";
import { PluginsVersionTag } from "./PluginVersionTag";
import { PluginExperienceTag } from "./PluginExperienceTag";
import { PluginGithubLink } from "./PluginGithubLink";
import { PluginTechTag } from "./PluginTechTag";

// // // //

export function PluginListItem(props: { plugin: PluginMetadata }) {
    const { plugin } = props;
    return (
        <div className="card card-body shadow-hover mb-2">
            <div className="row">
                <div className="col-lg-12 flex justify-between items-center">
                    <p className="lead mb-0 w-full flex justify-between items-center">
                        <img
                            className="mr-2"
                            style={{ maxWidth: "2rem" }}
                            src={plugin.content.icon}
                        />
                        {plugin.content.label}

                        <PluginGithubLink plugin={plugin} />
                    </p>
                </div>
                <div className="col-lg-12 mt-2">
                    <p className="card-text mb-2">
                        {plugin.content.description}
                    </p>
                </div>
                <div className="col-lg-12 flex justify-between items-center">
                    <span className="flex">
                        {plugin.typeTags.map((tag: string) => (
                            <PluginTypeTag tag={tag} key={tag} />
                        ))}
                        {plugin.techTags.map((tag: string) => (
                            <PluginTechTag tag={tag} key={tag} />
                        ))}
                    </span>

                    <span className="flex">
                        <PluginExperienceTag experience={plugin.experience} />
                        <PluginsVersionTag version={plugin.version} />
                    </span>
                </div>
            </div>
        </div>
    );
}
