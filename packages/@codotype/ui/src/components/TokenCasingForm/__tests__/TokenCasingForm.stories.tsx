import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { TokenCasingForm } from "../TokenCasingForm";
import { EMPTY_TOKEN_CASING } from "@codotype/types";

// // // //

storiesOf("Components/TokenCasingForm", module).add("renders", () => {
    const [tokenCasing, setTokenCasing] = React.useState({
        ...EMPTY_TOKEN_CASING,
    });
    return (
        <Story>
            <TokenCasingForm
                label={tokenCasing.label}
                onChange={setTokenCasing}
                onKeydownEnter={() => {
                    console.log("onKeydownEnter");
                }}
            />
        </Story>
    );
});
