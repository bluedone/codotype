import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { GeneratorListPage } from "../component";
import { testState } from "@codotype/types";

// // // //

storiesOf("Pages/GeneratorListing", module).add("renders", () => {
    return (
        <Story>
            <GeneratorListPage
                generators={[
                    testState.cdkGeneratorMeta,
                    testState.dummyGeneratorMeta,
                ]}
            />
        </Story>
    );
});
