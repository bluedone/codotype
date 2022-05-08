import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { MarkdownRenderer } from "../MarkdownRenderer";
import { PluginTypeTag } from "../PluginCard/PluginTypeTag";
import { PluginTechTag } from "../PluginCard/PluginTechTag";
import { PluginExperienceTag } from "../PluginCard/PluginExperienceTag";
import { PluginsVersionTag } from "../PluginCard/PluginVersionTag";
// import { PluginGithubLink } from "../PluginCard/PluginGithubLink";

// // // //

interface PluginStartProps {
    plugin: PluginMetadata;
    externalLink?: string;
    buildLink?: string;
}

/**
 * PluginStart
 * @param props - see `PluginStartProps`
 */
export function PluginStart(props: PluginStartProps) {
    return (
        <div className="grid grid-cols-1 h-full items-center select-none">
            <div className="flex flex-col">
                <div className="flex flex-col">
                    <div className="flex flex-col items-center">
                        <img
                            className="max-h-32"
                            src={props.plugin.content.icon}
                            draggable={false}
                        />
                        <h3 className="text-3xl mt-3">
                            {props.plugin.content.label}
                        </h3>
                        <p className="mt-2 lead text-gray-600 dark:text-gray-400">
                            powered by{" "}
                            <a
                                target="_blank"
                                className="text-blue-600 hover:text-blue-700"
                                href="https://codotype.io"
                            >
                                Codotype
                            </a>
                        </p>
                    </div>
                </div>

                <div className="flex flex-row my-3 justify-center">
                    <p className="lead">{props.plugin.content.description}</p>
                </div>

                <div className="flex flex-row justify-center">
                    {props.buildLink && (
                        <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full mr-2">
                            Let's build something
                        </button>
                    )}

                    {props.externalLink && (
                        <button className="bg-transparent hover:bg-blue-500 text-blue-500 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded-full mr-2">
                            Let's build something
                        </button>
                    )}
                </div>

                <div className="grid grid-cols-1 mt-3">
                    <div className="flex flex-row justify-center items-center w-full">
                        {props.plugin.techTags.map(tag => (
                            <PluginTechTag key={tag} tag={tag} />
                        ))}
                    </div>

                    <div className="flex flex-row justify-center items-center flex-wrap mt-2 w-full">
                        {props.plugin.typeTags.map(tag => (
                            <PluginTypeTag key={tag} tag={tag} />
                        ))}
                        <PluginExperienceTag
                            experience={props.plugin.experience}
                        />
                        <PluginsVersionTag version={props.plugin.version} />
                        {/* <PluginGithubLink plugin={props.plugin} /> */}
                    </div>
                </div>

                <div className="my-10">
                    <hr />
                </div>

                <div className="flex justify-center">
                    <MarkdownRenderer
                        className="w-3/4"
                        source={props.plugin.content.documentation}
                    />
                </div>
            </div>
        </div>
    );
}
