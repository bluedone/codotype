module.exports = {
    name: "Base Module",
    async write({ runtime }) {
        await runtime.copyDir({ src: "", dest: "" });
    },
};
