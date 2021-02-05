import * as React from "react";

// // // //

export function PluginsVersionTag(props: { version: string }) {
    const { version } = props;
    return (
        <span className="badge bg-gray-800 text-white">Version {version}</span>
    );
}
