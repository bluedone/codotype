import * as React from "react";
import { faExternalLinkAlt } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // // //

/**
 * MoreInfoLinkProps
 * Props for the `MoreInfoLink` component
 * @param url - the URL thats linked to
 */
interface MoreInfoLinkProps {
    url: string;
}

/**
 * MoreInfoLink
 * Renders a link that when clicked opens a new tab to some relevant information
 */
export function MoreInfoLink(props: MoreInfoLinkProps) {
    return (
        <a href={props.url} target="_blank">
            <FontAwesomeIcon icon={faExternalLinkAlt} />
        </a>
    );
}
