import * as React from "react";

// // // //

export function GeneratorTechTag(props: { tag: string }) {
    const { tag } = props;
    return <span className="badge badge-light mr-1">{tag}</span>;
}
