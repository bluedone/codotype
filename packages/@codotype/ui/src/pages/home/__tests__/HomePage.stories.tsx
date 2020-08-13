import * as React from "react";
import { storiesOf } from "@storybook/react";
import { testState } from "@codotype/core";
import { HomePage } from "../HomePage";
import { Pricing } from "../Pricing";
import { AppNavbar } from "@src/components/navbar";
import { AppFooter } from "@src/components/AppFooter";

// // // //

storiesOf("Pages/HomePage", module).add("renders", () => {
    return (
        <React.Fragment>
            <AppNavbar />
            <HomePage
                generators={[
                    testState.cdkGeneratorMeta,
                    testState.dummyGeneratorMeta,
                ]}
                // https://res.cloudinary.com/codotype/image/upload/v1560045410/product-images/codotype-dashboard-02.png
                infoBullets={[
                    {
                        title: "Crazy Fast",
                        body:
                            "Save weeks of development time on your next project",
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
            <Pricing />
            <AppFooter />
        </React.Fragment>
    );
});
