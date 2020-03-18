import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ChevronAnimation } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("ChevronAnimation", module).add("active = true", () => {
    return (
        <Story>
            <ChevronAnimation active />
        </Story>
    );
});

storiesOf("ChevronAnimation", module).add("active = false", () => {
    return (
        <Story>
            <ChevronAnimation active={false} />
        </Story>
    );
});
