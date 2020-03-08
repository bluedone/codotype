import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DatatypeIcon } from "../DatatypeIcon";
import { Story } from "@src/components/dev";
import { Datatype } from "@codotype/types";

// // // //

storiesOf("DatatypeIcon", module).add("renders", () => {
    return (
        <Story>
            <p>All Icons:</p>
            <p>STRING</p>
            <DatatypeIcon className="mb-2" datatype={Datatype.STRING} />
            <hr />
            <p>NUMERIC</p>
            <DatatypeIcon className="mb-2" datatype={Datatype.NUMERIC} />
            <hr />
            <p>BOOLEAN</p>
            <DatatypeIcon className="mb-2" datatype={Datatype.BOOLEAN} />
            <hr />
            <p>INTEGER</p>
            <DatatypeIcon className="mb-2" datatype={Datatype.INTEGER} />
            <hr />
            <p>BIGINT</p>
            <DatatypeIcon datatype={Datatype.BIGINT} />
        </Story>
    );
});
