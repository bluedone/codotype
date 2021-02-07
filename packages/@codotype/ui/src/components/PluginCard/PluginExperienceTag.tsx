import * as React from "react";
import {
    ExperienceRecommendation,
    ExperienceRecommendations,
} from "@codotype/core";

// // // //

const mapRecommendationToLabel: {
    [key in ExperienceRecommendations]: string;
} = {
    [ExperienceRecommendations.beginner]: "Beginner",
    [ExperienceRecommendations.junior]: "Junior",
    [ExperienceRecommendations.intermediate]: "Intermediate",
    [ExperienceRecommendations.expert]: "Expert",
};

export function PluginExperienceTag(props: {
    experience: ExperienceRecommendation;
}) {
    return (
        <span className="badge bg-green-500 text-white">
            {mapRecommendationToLabel[props.experience]}
        </span>
    );
}
