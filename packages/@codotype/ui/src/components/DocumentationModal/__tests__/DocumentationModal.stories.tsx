import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { DocumentationModal } from "../DocumentationModal";

// // // //

storiesOf("Components/DocumentationModal", module).add("renders", () => {
    return (
        <Story>
            <DocumentationModal
                header={"Documentation"}
                documentation={"# Hello! "}
            />
        </Story>
    );
});
