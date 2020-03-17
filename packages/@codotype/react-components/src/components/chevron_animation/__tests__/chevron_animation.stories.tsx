import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ChevronAnimation } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("ChevronAnimation", module).add("renders", () => {
    return (
        <Story>
            <ChevronAnimation active />
        </Story>
    );
});
