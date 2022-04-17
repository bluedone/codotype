import * as React from "react";
import { GenerateCodeButton } from "../GenerateCodeButton";
import { Story } from "../../Story";
import { action } from "@storybook/addon-actions";

// // // //

export default {
    title: "Components/GenerateCodeButton",
    component: GenerateCodeButton,
};

export const Render = () => {
    return (
        <Story slim>
            <GenerateCodeButton onClick={action("click")} />
        </Story>
    );
};

export const Disable = () => {
    return (
        <Story slim>
            <GenerateCodeButton disabled onClick={action("click")} />
        </Story>
    );
};
