import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// // // //

export function PluginGithubLink(props: { plugin: PluginMetadata }) {
    const { plugin } = props;
    return (
        <small className="flex flex-row items-center text-gray-600 hover:text-gray-700">
            <FontAwesomeIcon icon={faGithub} />
            <a target="_blank" className="ml-1" href={plugin.homepage}>
                {plugin.homepage}
            </a>
        </small>
    );
}
