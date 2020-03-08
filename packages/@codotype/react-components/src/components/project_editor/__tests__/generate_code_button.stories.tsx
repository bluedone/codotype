import * as React from "react";
import { storiesOf } from "@storybook/react";
import { GenerateCodeButton } from "../GenerateCodeButton";
import { Story } from "@src/components/dev";

// // // //

storiesOf("GenerateCodeButton", module).add("enabled", () => {
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

storiesOf("GenerateCodeButton", module).add("disabled", () => {
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
