// Doc: https://storybook.js.org/addons/storybook-addon-next-router
import { RouterContext } from "next/dist/shared/lib/router-context"; // next 11.2

export const parameters = {
    nextRouter: {
        Provider: RouterContext.Provider,
    },
    options: {
        storySort: {
            order: ['Docs', 'Pages', 'Components', 'Util'],
            // order: ['Docs', 'Pages', ['Home', 'Login', 'Admin'], 'Components'],
        },
    },
};