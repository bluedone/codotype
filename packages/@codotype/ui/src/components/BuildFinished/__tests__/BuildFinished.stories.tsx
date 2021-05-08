import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BuildFinished } from "../component";
import { Story } from "../../Story";
import { ResponseTypes } from "@codotype/core";

// // // //

storiesOf("Components/BuildFinished", module).add("S3 Download", () => {
    return (
        <Story>
            <BuildFinished
                responseType={ResponseTypes.s3}
                filepath="https://google.com"
                onClickBackToEditor={() => {
                    console.log("onClickBackToEditor");
                }}
            />
        </Story>
    );
});

storiesOf("Components/BuildFinished", module).add("Local Path", () => {
    return (
        <Story>
            <BuildFinished
                responseType={ResponseTypes.local}
                filepath="/foo/bar/codotype-build/project"
                onClickBackToEditor={() => {
                    console.log("onClickBackToEditor");
                }}
            />
        </Story>
    );
});
