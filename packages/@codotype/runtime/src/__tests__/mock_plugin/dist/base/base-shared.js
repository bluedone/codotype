module.exports = {
    name: "Base Shared Module",
    async write({ runtime }) {
        await runtime.ensureDir("mydir");
        await runtime.renderTemplate({
            src: "Shared.txt",
            dest: "mydir/Shared.txt",
            data: {},
        });
        // await runtime.renderTemplate({
        //     src: "Shared.txt",
        //     dest: "shared-renamed.txt",
        //     data: {},
        // });
    },
};
