import * as React from "react";
import { storiesOf } from "@storybook/react";
import { AppContainer } from "../component";
import { NextJsWebsiteStarterPlugin } from "../../../pages/web_runtime/__tests__/test_state";

// // // //

const stories = storiesOf("Components/AppContainer", module);

stories.add("renders", () => {
    return (
        <AppContainer plugin={NextJsWebsiteStarterPlugin}>
            <p>Plugin Component Goes Here</p>
        </AppContainer>
    );
});
