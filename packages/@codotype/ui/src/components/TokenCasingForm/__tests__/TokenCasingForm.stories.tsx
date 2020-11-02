import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../dev";
import { TokenCasingForm } from "../TokenCasingForm";
import { EMPTY_TOKEN_CASING } from "@codotype/core";

// // // //

storiesOf("Components/TokenCasingForm", module).add("renders", () => {
    const [tokenCasing, setTokenCasing] = React.useState({
        ...EMPTY_TOKEN_CASING,
    });
    return (
        <Story>
            <TokenCasingForm
                label={tokenCasing.title}
                onChange={setTokenCasing}
                onKeydownEnter={() => {
                    console.log("onKeydownEnter");
                }}
            />
        </Story>
    );
});
