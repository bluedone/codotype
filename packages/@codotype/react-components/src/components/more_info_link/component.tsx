import * as React from "react";
import { string } from "prop-types";

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
      More Info
    </a>
  );
}
