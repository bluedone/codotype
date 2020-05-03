import * as React from "react";
import "../app.scss";

export default function MyApp({ Component, pageProps }) {
  return (
    <div className="container pt-4">
      <Component {...pageProps} />
    </div>
  );
}
