module.exports = {
    name: "Shallow Directory",
    async write({ runtime }) {
        // Copy all templates directory
        await runtime.copyDir({
            src: "",
            dest: "",
        });
    },
};
