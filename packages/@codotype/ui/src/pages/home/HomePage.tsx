import * as React from "react";
import { Jumbotron } from "./Jumbotron";
import { PluginMetadata } from "@codotype/core";
import { InfoBullets, InfoBullet } from "./InfoBullets";
import { GitHubStar } from "../../components/GitHubStar";
import { Shapes } from "./Shapes";

// // // //

/**
 * HomePage
 */
export function HomePage(props: {
    generators: PluginMetadata[];
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
        </Shapes>
    );
}
