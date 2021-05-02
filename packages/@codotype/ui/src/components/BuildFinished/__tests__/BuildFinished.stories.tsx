import * as React from "react";
import { storiesOf } from "@storybook/react";
import { BuildFinished } from "../component";
import { Story } from "../../Story";

// // // //

storiesOf("Components/BuildFinished", module).add("S3 Download", () => {
    return (
        <Story>
            <BuildFinished
                responseType="S3_DOWNLOAD"
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
                filepath="/foo/bar/codotype-build/project"
                responseType="LOCAL_PATH"
                onClickBackToEditor={() => {
                    console.log("onClickBackToEditor");
                }}
            />
        </Story>
    );
});
