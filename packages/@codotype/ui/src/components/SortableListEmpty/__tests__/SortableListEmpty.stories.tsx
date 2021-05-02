import * as React from "react";
import { storiesOf } from "@storybook/react";
import { SortableListEmpty } from "../component";
import { Story } from "../../Story";

// // // //

storiesOf("Components/SortableListEmpty", module).add("render", () => {
    const [count, increment] = React.useReducer(i => i++, 0);
    return (
        <Story>
            <SortableListEmpty
                onClick={increment}
                title="Attributes"
                body="Add attributes to your data model"
                cta="Add attributes to your data model"
            />
            {count}
        </Story>
    );
});
