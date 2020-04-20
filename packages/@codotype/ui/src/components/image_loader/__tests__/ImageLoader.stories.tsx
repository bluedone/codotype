import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ImageLoader } from "../component";
import { Story } from "@src/components/dev";

// // // //

storiesOf("Components/ImageLoader", module).add("active = true", () => {
    return (
        <Story>
            <ImageLoader src="https://res.cloudinary.com/codotype/image/upload/v1558931014/product-logos/twitter-512.png" />
        </Story>
    );
});
