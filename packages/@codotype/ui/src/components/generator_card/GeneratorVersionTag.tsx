import * as React from "react";

// // // //

export function GeneratorVersionTag(props: { version: string }) {
    const { version } = props;
    return <span className="badge badge-dark mr-1">Version {version}</span>;
}
