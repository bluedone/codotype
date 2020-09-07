import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ChevronAnimation } from "../component";
import { Story } from "../../dev";

// // // //

storiesOf("Components/ChevronAnimation", module)
    .add("active = true", () => {
        return (
            <Story>
                <ChevronAnimation active />
            </Story>
        );
    })
    .add("active = false", () => {
        return (
            <Story>
                <ChevronAnimation active={false} />
            </Story>
        );
    });
