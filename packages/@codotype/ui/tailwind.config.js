module.exports = {
    purge: [],
    // https://tailwindcss.com/docs/guides/nextjs#configure-tailwind-to-remove-unused-styles-in-production
    // purge: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
    // darkMode: false, // or 'media' or 'class'
    darkMode: "class",
    theme: {
        extend: {
            colors: {
                // TODO - update these to theme the UI
                // "primary-400": "rgb(129 140 248)",
                // "primary-500": "rgb(99 102 241)",
                // "primary-600": "rgb(79 70 229)",
                // "primary-700": "rgb(67 56 202)",
                // "primary-900": "rgb(49 46 129)",

                // // // // 
                "light-background": "#f5f6f9",
                "primary-50": "rgb(239 246 255)",
                "primary-100": "rgb(219 234 254)",
                "primary-200": "rgb(191 219 254)",
                "primary-300": "rgb(147 197 253)", // #93c5fd
                "primary-400": "rgb(96 165 250)", // #60a5fa
                "primary-500": "rgb(59 130 246)", // #3b83f6
                "primary-600": "rgb(37 99 235)", // #2563eb
                "primary-700": "rgb(29 78 216)", // #1d4ed8
                "primary-800": "rgb(30 64 175)", // #1e40af
                "primary-900": "rgb(30 58 138)", // #1e3b8a
                // // // // 
                // Amber colors
                // "amber-50": "#fff8e1",
                // "amber-100": "#ffecb3",
                // "amber-200": "#ffe082",
                // "amber-300": "#ffd54f",
                // "amber-400": "#ffca28",
                // "amber-500": "#ffc107",
                // "amber-600": "#ffb300",
                // "amber-700": "#ffa000",
                // "amber-800": "#ff8f00",
                // "amber-900": "#ff6f00",
                // // // // 
                // Amber as primary
                // "primary-50": "#fff8e1",
                // "primary-100": "#ffecb3",
                // "primary-200": "#ffe082",
                // "primary-300": "#ffd54f",
                // "primary-400": "#ffca28",
                // "primary-500": "#ffc107",
                // "primary-600": "#ffb300",
                // "primary-700": "#ffa000",
                // "primary-800": "#ff8f00",
                // "primary-900": "#ff6f00",
            }
        },
    },
    variants: {
        extend: {},
    },
    plugins: [require("@tailwindcss/forms")],
};
