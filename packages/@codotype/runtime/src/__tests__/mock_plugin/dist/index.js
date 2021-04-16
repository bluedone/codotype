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

        // Test runtime.copyDir with a shallow directory
        await runtime.composeWith("./shallow-directory");

        // Test runtime.copyDir with a nested directory
        await runtime.composeWith("./nested-directories");

        // Test copy-file generator
        await runtime.composeWith("./copy-file");

        // Compose ./scoped generator
        await runtime.ensureDir("./scoped-output");
        await runtime.composeWith("./scoped", {
            outputDirectoryScope: "scoped-output",
        });
    },
};
