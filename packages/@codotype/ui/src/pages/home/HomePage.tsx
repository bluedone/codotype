import * as React from "react";
import { Jumbotron } from "./Jumbotron";
import styled from "styled-components";
import { GeneratorMeta } from "@codotype/types";
import { InfoBullets, InfoBullet } from "./InfoBullets";
import { FeatureSections, FeatureSection } from "./FeatureSection";

// // // //

const ShapeOne = styled.div`
    padding: 0.2em 0;
    position: absolute;
    background-color: #4e92fc;
    background-image: linear-gradient(100deg, #4e92fc, #1fd3f2);
    top: -350px;
    right: -110px;
    border-radius: 8%;
    width: 50%;
    height: 800px;
    transform: skew(3deg, 30deg);
    opacity: 1;
`;

const ShapeTwo = styled.div`
    position: absolute;
    background-color: #4e92fc;
    background-image: linear-gradient(100deg, #4e92fc, #1fd3f2);
    top: -400px;
    left: -350px;
    border-radius: 100%;
    height: 800px;
    width: 800px;
    opacity: 0.2;
`;

const ShapeThree = styled.div`
    position: absolute;
    background-color: #4e92fc;
    background-image: linear-gradient(100deg, #4e92fc, #1fd3f2);
    top: 150px;
    left: 350px;
    border-radius: 100%;
    height: 100px;
    width: 100px;
    opacity: 0.8;
`;

// // // //

/**
 * HomePage
 */
export function HomePage(props: {
    generators: GeneratorMeta[];
    infoBullets: InfoBullet[];
}) {
    return (
        <React.Fragment>
            <ShapeOne />
            <ShapeTwo />
            <ShapeThree />
            <Jumbotron
                title="Codotype"
                subtitle="Smart Code Scaffolding"
                body="Hand-crafted code scaffolding for the modern web. Prototype new web applications amazingly fast. Get started for free"
                generators={props.generators}
            />
            <InfoBullets infoSections={props.infoBullets} />
            <FeatureSections featureSections={props.infoBullets} />
        </React.Fragment>
    );
}
