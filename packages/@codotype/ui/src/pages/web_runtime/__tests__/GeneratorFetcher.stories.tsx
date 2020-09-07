import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/dev";
import { GeneratorFetcher } from "../GeneratorFetcher";

// // // //

storiesOf("GeneratorFetcher", module).add("loads", () => {
    return (
        <Story>
            <GeneratorFetcher>
                {({ generators }) => {
                    return <pre>{JSON.stringify(generators, null, 4)}</pre>;
                }}
            </GeneratorFetcher>
        </Story>
    );
});
