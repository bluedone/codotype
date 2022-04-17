import * as React from "react";
import { testState } from "@codotype/core";
import { HomePage } from "../HomePage";
import { FeatureSections } from "../FeatureSection";
import { AppNavbar } from "../../../components/navbar";
import { ComponentStory, ComponentMeta } from "@storybook/react";

// // // //

export default {
    title: "Marketing/Pages/Home",
    component: HomePage,
    parameters: {
        layout: "fullscreen",
    },
} as ComponentMeta<typeof HomePage>;

const Template: ComponentStory<typeof HomePage> = () => (
    <React.Fragment>
        <AppNavbar />
        <HomePage
            plugins={[testState.cdkPluginMeta, testState.dummyPluginMetadata]}
            // https://res.cloudinary.com/codotype/image/upload/v1560045410/product-images/codotype-dashboard-02.png
            infoBullets={[
                {
                    title: "Crazy Fast",
                    body: "Save weeks of development time on your next project",
                },
                {
                    title: "Data-driven",
                    body:
                        "Sketch out your database and generate customized boilerplate code",
                },
                {
                    title: "Versatile",
                    body:
                        "Generate full-stack applications with a variety of languages and frameworks",
                },
            ]}
        />
        <FeatureSections
            featureSections={[
                {
                    title: "Crazy Fast",
                    body: "Save weeks of development time on your next project",
                    imgSrc:
                        "https://res.cloudinary.com/codotype/image/upload/v1560045410/product-images/codotype-dashboard-02.png",
                },
                {
                    title: "Data-driven",
                    body:
                        "Sketch out your database and generate customized boilerplate code",
                    imgSrc:
                        "https://res.cloudinary.com/codotype/image/upload/v1560045410/product-images/codotype-dashboard-02.png",
                },
                {
                    title: "Versatile",
                    body:
                        "Generate full-stack applications with a variety of languages and frameworks",
                    imgSrc:
                        "https://res.cloudinary.com/codotype/image/upload/v1560045410/product-images/codotype-dashboard-02.png",
                },
            ]}
        />
    </React.Fragment>
);

// // // //

export const Render = Template.bind({});
