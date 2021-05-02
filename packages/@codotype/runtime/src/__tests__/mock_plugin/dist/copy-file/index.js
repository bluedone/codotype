module.exports = {
    name: "Copy File",
    async write({ runtime }) {
        // Copy file 01
        await runtime.copyFile("copy-file-01.txt");

        // Copy file 02
        await runtime.copyFile({
            src: "copy-file-02.txt",
            dest: "copy-file-02.txt",
        });
    },
};
