import * as React from "react";
import { Jumbotron } from "./Jumbotron";
import { GeneratorMeta } from "@codotype/core";
import { InfoBullets, InfoBullet } from "./InfoBullets";
import { FeatureSections } from "./FeatureSection";
import { GitHubStar } from "../../components/GitHubStar";
import { Shapes } from "./Shapes";

// // // //

/**
 * HomePage
 */
export function HomePage(props: {
    generators: GeneratorMeta[];
    infoBullets: InfoBullet[];
}) {
    return (
        <Shapes>
            <Jumbotron
                title="Codotype"
                subtitle="Smart Code Scaffolding"
                body="Hand-crafted code scaffolding for the modern web. Prototype new web applications amazingly fast. Get started for free"
                generators={props.generators}
            >
                <GitHubStar />
            </Jumbotron>
            <InfoBullets infoSections={props.infoBullets} />
            <FeatureSections featureSections={props.infoBullets} />
        </Shapes>
    );
}
