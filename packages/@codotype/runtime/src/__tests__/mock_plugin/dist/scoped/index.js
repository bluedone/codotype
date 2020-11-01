module.exports = {
    name: "Scoped Module",
    async write({ runtime }) {
        // Test writing a file directly
        // TODO - remove the need to include `runtime.destinationPath` -> should be totally obfuscased
        await runtime.writeFile(
            runtime.destinationPath("SCOPED-TEST.md"),
            "This is the content rendered in SCOPED-TEST.md in the scoped directory of the project",
        );

        // Test copyDir
        await runtime.copyDir({ src: "", dest: "" });

        // TODO - add test to cover renderTemplate
    },
};
