import * as React from "react";
import { PluginMetadata } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// // // //

export function PluginGithubLink(props: { plugin: PluginMetadata }) {
    const { plugin } = props;
    return (
        <small className="d-flex flex-row align-items-center text-muted mt-2">
            {/* <font-awesome-icon v-if="svg" : icon="['fab', 'github']" className="mr-1" /> */}
            <FontAwesomeIcon icon={faGithub} />
            <i className="fab fa-github mr-1" />
            <a className="text-muted" target="_blank" href={plugin.homepage}>
                {plugin.homepage}
            </a>
        </small>
    );
}
