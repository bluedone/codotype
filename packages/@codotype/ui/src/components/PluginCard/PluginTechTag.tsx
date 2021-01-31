import * as React from "react";

// // // //

export function PluginTechTag(props: { tag: string }) {
    const { tag } = props;
    return <span className="badge bg-gray-300">{tag}</span>;
}
