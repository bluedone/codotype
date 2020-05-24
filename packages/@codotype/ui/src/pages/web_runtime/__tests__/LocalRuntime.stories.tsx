import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { LocalRuntime } from "../LocalRuntime";

// // // //

storiesOf("Pages/LocalRuntime", module).add("renders", () => {
    return (
        <Story>
            <LocalRuntime />
        </Story>
    );
});
