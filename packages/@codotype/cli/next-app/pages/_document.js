import * as React from "react";
import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html>
        <Head>
          <meta charset="utf-8" />
          <title>Codotype - Home</title>
          <meta property="twitter:card" content="summary" />
          <meta property="twitter:site" value="@codotype" />
          <meta property="twitter:creator" value="@aeksco" />
          <meta
            property="twitter:image"
            content="https://avatars2.githubusercontent.com/u/42126198?s=200&amp;v=4"
          />
          <meta
            name="description"
            content="Instantly generate full-stack boilerplate code with custom CRUD."
          />
          <meta property="og:url" content="https://codotype.io" />
          <meta property="og:type" content="website" />
          <meta property="og:site_name" content="Codotype" />
          <meta
            property="og:title"
            content="Codotype - Building Better Boilerplate"
          />
          <meta
            property="og:description"
            content="Instantly generate full-stack boilerplate code with custom CRUD."
          />
          <meta
            property="og:image"
            content="https://res.cloudinary.com/codotype/image/upload/v1563148543/product-images/thumbnail.png"
          />

          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <link
            rel="icon"
            type="image/png"
            href="https://res.cloudinary.com/codotype/image/upload/v1552257221/codotype-icons/favicon.png"
          />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
