import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../../components/dev";
import { GeneratorListPage } from "../component";
import { testState } from "@codotype/core";

// // // //

storiesOf("Pages/www/GeneratorListing", module).add("renders", () => {
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
