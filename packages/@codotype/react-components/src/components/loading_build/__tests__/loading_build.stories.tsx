import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LoadingBuild } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("LoadingBuild", module).add("renders", () => {
    return (
        <Story>
            <LoadingBuild />
        </Story>
    );
});
