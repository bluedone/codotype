import * as React from "react";
import { AppNavbar } from "@codotype/ui";
import { LocalRuntime } from "@codotype/ui/dist/src/pages/web_runtime/LocalRuntime";

// // // //

export default () => {
  return (
    <div>
      <AppNavbar />
      <div className="mt-4 pt-4">
        <LocalRuntime />
      </div>
    </div>
  );
};
