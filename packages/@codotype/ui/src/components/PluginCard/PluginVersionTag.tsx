import * as React from "react";

// // // //

export function PluginsVersionTag(props: { version: string }) {
    const { version } = props;
    return (
        <span className="badge badge-dark mr-1 mt-2">Version {version}</span>
    );
}
