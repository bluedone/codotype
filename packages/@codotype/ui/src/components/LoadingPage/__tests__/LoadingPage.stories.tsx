import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { LoadingPage } from "../LoadingPage";

// // // //

storiesOf("Components/LoadingPage", module).add("renders", () => {
    return (
        <Story>
            <LoadingPage />
        </Story>
    );
});
