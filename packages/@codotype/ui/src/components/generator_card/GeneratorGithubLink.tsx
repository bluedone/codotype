import * as React from "react";
import { GeneratorMeta } from "@codotype/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";

// // // //

export function GeneratorGithubLink(props: { generator: GeneratorMeta }) {
    const { generator } = props;
    return (
        <small className="d-flex flex-row align-items-center text-muted">
            {/* <font-awesome-icon v-if="svg" : icon="['fab', 'github']" className="mr-1" /> */}
            <FontAwesomeIcon icon={faGithub} />
            <i className="fab fa-github mr-1" />
            <a className="text-muted" target="_blank" href={generator.homepage}>
                {generator.homepage}
            </a>
        </small>
    );
}
