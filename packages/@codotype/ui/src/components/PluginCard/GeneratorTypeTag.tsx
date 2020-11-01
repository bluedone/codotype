import * as React from "react";

// // // //

export function GeneratorTypeTag(props: { tag: string }) {
    const { tag } = props;
    return <span className="badge badge-primary mr-1 mt-2">{tag}</span>;
}
