import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GenerateCodeButton } from "../GenerateCodeButton";
import { Story } from "../../dev";

// // // //

storiesOf("Components/GenerateCodeButton", module).add("enabled", () => {
    return (
        <Story>
            <GenerateCodeButton
                onClick={() => {
                    return;
                }}
            />
        </Story>
    );
});

storiesOf("Components/GenerateCodeButton", module).add("disabled", () => {
    return (
        <Story>
            <GenerateCodeButton
                disabled
                onClick={() => {
                    return;
                }}
            />
        </Story>
    );
});
