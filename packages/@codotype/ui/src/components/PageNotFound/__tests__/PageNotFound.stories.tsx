import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../Story";
import { PageNotFound } from "../component";

// // // //

storiesOf("Components/PageNotFound", module).add("renders", () => {
    return (
        <Story>
            <PageNotFound />
        </Story>
    );
});
