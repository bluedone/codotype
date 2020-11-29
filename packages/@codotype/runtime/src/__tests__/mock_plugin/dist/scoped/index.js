module.exports = {
    name: "Scoped Module",
    async write({ runtime }) {
        // Test writing a file directly
        await runtime.writeFile(
            "SCOPED-TEST.md",
            "This is the content rendered in SCOPED-TEST.md in the scoped directory of the project",
        );

        // Test copyDir
        await runtime.copyDir({ src: "", dest: "" });
    },
};
