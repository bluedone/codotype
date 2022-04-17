import * as React from "react";
import { LandingPage } from "../component";
import { INITIAL_VIEWPORTS } from "@storybook/addon-viewport";
import { HeroAlt } from "../HeroAlt";

// // // //

export default {
    title: "Marketing/Pages/Landing",
    component: LandingPage,
    parameters: {
        layout: "fullscreen",
        viewport: {
            viewports: INITIAL_VIEWPORTS,
        },
    },
};

// // // //
// Desktop
export const RenderDesktop = () => {
    return <LandingPage />;
};

// // // //
// Iphone
export const RenderIphoneX = () => {
    return <LandingPage />;
};
RenderIphoneX.parameters = {
    viewport: {
        defaultViewport: "iphonex",
    },
};

// // // //
// Variation
export const Variation = () => <HeroAlt />;
