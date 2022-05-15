import * as React from "react";

/**
 * SocialMeta
 * Returns <meta> tags for Twitter
 */
export function SocialMeta() {
    return (
        <React.Fragment>
            <meta charSet="utf-8" />
            <meta property="twitter:card" content="summary" />
            <meta property="twitter:site" content="@codotype" />
            <meta property="twitter:creator" content="@aeksco" />
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

            <link
                rel="icon"
                type="image/png"
                // href="https://res.cloudinary.com/codotype/image/upload/v1552257221/codotype-icons/favicon.png"
                href="https://avatars2.githubusercontent.com/u/42126198?s=200&amp;v=4"
            />

            <meta
                name="viewport"
                content="width=device-width, initial-scale=1, shrink-to-fit=no"
            />
        </React.Fragment>
    );
}
