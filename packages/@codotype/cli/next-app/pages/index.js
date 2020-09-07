import * as React from "react";
import { AppNavbar } from "@codotype/ui/dist/src/components/navbar";
import dynamic from "next/dynamic";
import Head from "next/head";

const LocalRuntime = dynamic(
  import("@codotype/ui/dist/src/pages/web_runtime/LocalRuntime").then(
    (mod) => mod.LocalRuntime
  ),
  {
    ssr: false,
  }
);

// // // //

export default () => {
  return (
    <React.Fragment>
      <Head>
        <title>Codotype</title>
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
      </Head>
      <AppNavbar />
      <div className="mt-4 pt-4">{<LocalRuntime />}</div>
    </React.Fragment>
  );
};
