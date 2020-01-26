import * as React from "react";
import { MoreInfoLink } from "../more_info_link";

// // // //

/**
 * ConfigurationGroupHeaderProps
 * Props for the `ConfigurationGroupHeader` component
 * @param title - the title in the header
 * @param description - the description in the header
 * @param moreInfoUrl - (optional) the URL passed into `MoreInfoLink`
 */
interface ConfigurationGroupHeaderProps {
  title: string;
  description: string;
  moreInfoUrl?: string;
}

/**
 * ConfigurationGroupHeader
 * Renders the header for a single ConfigurationGroup
 */
export function ConfigurationGroupHeader(props: ConfigurationGroupHeaderProps) {
  return (
    <div>
      <p>{props.title}</p>
      {props.moreInfoUrl && <MoreInfoLink url={props.moreInfoUrl} />}
      <p>{props.description}</p>
    </div>
  );
}
