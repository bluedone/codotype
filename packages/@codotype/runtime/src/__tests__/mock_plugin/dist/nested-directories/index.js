module.exports = {
    name: "Nested Directories",
    async write({ runtime }) {
        // Write file directly
        await runtime.copyDir({
            src: "",
            dest: "",
        });
    },
};
