import * as React from "react";
import { storiesOf } from "@storybook/react";
import { LoadingBuild, quotes } from "../component";
import { Story } from "../../Story";

// // // //

const storyCollection = storiesOf("Components/LoadingBuild", module);
quotes.forEach((quote, index) => {
    storyCollection.add(`quote ${index}`, () => {
        return (
            <Story>
                <LoadingBuild quote={quote} />
            </Story>
        );
    });
});
