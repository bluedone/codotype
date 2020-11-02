import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LoadingSpinner } from "../component";
import { Story } from "../../Story";

// // // //

storiesOf("Components/LoadingSpinner", module).add("renders", () => {
    return (
        <Story>
            <LoadingSpinner />
        </Story>
    );
});
