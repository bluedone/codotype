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
    plugins: PluginMetadata[];
    infoBullets: InfoBullet[];
}) {
    return (
        <Shapes>
            <Jumbotron
                title="Codotype"
                subtitle="Smart Code Scaffolding"
                body="Hand-crafted code scaffolding for the modern web. Prototype new web applications amazingly fast. Get started for free"
                plugins={props.plugins}
            >
                <GitHubStar />
            </Jumbotron>
            <InfoBullets infoSections={props.infoBullets} />
        </Shapes>
    );
}
