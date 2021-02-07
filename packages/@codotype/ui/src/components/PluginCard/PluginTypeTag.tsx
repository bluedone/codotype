import * as React from "react";

// // // //

export function PluginTypeTag(props: { tag: string }) {
    const { tag } = props;
    return <span className="badge bg-blue-600 text-white">{tag}</span>;
}
