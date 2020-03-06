import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SortableListHeader } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("SortableListHeader", module).add("Attributes", () => {
    return (
        <Story>
            <SortableListHeader label="Attributes" />
        </Story>
    );
});

storiesOf("SortableListHeader", module).add("Relations", () => {
    return (
        <Story>
            <SortableListHeader label="Relations" />
        </Story>
    );
});
