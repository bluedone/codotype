module.exports = {
    name: "Mock Plugin",
    async write({ runtime }) {
        // Write file directly
        // TODO - remove runtimeDestinationPath to simplify the API here, more intuitive.
        await runtime.writeFile(
            runtime.destinationPath("README-TEST.md"),
            "This is the content rendered in README.md in the root of the project",
        );

        // Compose ./base generator
        await runtime.composeWith("./base");

        // Compose ./scoped generator
        // TODO - remove ensureDir when it's handled internally by the runtime
        await runtime.ensureDir("./scoped-output");
        await runtime.composeWith("./scoped", {
            outputDirectoryScope: "scoped-output",
        });
    },
};
