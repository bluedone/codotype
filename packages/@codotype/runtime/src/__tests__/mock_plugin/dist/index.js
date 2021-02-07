module.exports = {
    name: "Mock Plugin",
    async write({ runtime }) {
        // Write file directly
        await runtime.writeFile(
            "README-TEST.md",
            "This is the content rendered in README.md in the root of the project",
        );

        // Compose ./base generator
        await runtime.composeWith("./base");

        // Compose ./scoped generator
        await runtime.ensureDir("./scoped-output");
        await runtime.composeWith("./scoped", {
            outputDirectoryScope: "scoped-output",
        });
    },
};
