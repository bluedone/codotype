import * as React from "react";

// // // //

export function PluginExperienceTag(props: { experience: string }) {
    return (
        <span className="badge bg-green-500 mr-1 mt-2">
            {props.experience}
        </span>
    );
}
