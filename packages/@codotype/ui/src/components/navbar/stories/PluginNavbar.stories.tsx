import * as React from "react";
import { storiesOf } from "@storybook/react";
import { PluginNavbar } from "../PluginNavbar";
import { NextJsWebsiteStarterPluginVariant } from "../../../pages/web_runtime/__tests__/test_state";

// // // //

storiesOf("Components/PluginNavbar", module).add("renders", () => {
    return <PluginNavbar plugin={NextJsWebsiteStarterPluginVariant} />;
});
