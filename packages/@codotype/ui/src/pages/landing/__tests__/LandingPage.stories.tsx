import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LandingPage } from "../component";

// // // //

storiesOf("Pages/www/LandingPage", module).add("renders", () => {
    return <LandingPage />;
});
