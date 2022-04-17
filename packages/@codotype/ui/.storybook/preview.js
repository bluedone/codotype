// Doc: https://storybook.js.org/addons/storybook-addon-next-router
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11.2

export const parameters = {
    nextRouter: {
        Provider: RouterContext.Provider,
    },
    options: {
        storySort: {
            order: ["App", "Marketing", "Components", "Util", "Developer", "Docs"]
        },
    },
};

// // // // 
// import React from "react";

// const whyDidYouRender = require("@welldone-software/why-did-you-render");
// whyDidYouRender(React, {
//     trackAllPureComponents: true,
// });
