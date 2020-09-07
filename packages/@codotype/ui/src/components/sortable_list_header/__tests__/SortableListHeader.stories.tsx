import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SortableListHeader } from "../component";
import { Story } from "../../dev";

// // // //

storiesOf("Components/SortableListHeader", module).add("Attributes", () => {
    const [count, increment] = React.useReducer(i => i++, 0);
    return (
        <Story>
            <SortableListHeader label="Attributes" onClick={increment} />
            {count}
        </Story>
    );
});

storiesOf("Components/SortableListHeader", module).add("Relations", () => {
    const [count, increment] = React.useReducer(i => i++, 0);
    return (
        <Story>
            <SortableListHeader label="Relations" onClick={increment} />
            {count}
        </Story>
    );
});
