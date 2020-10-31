import { PluginBuilder } from "../Plugin";

// // // //

describe("factory", () => {
    test("works", () => {
        const plugin = new PluginBuilder({
            id: "my-codotype-plugin",
            project_path: "my_codotype_plugin",
            content: {
                label: "My Codotype Plugin",
                description: "My Codotype Plugin description",
                documentation: "My Codotype Plugin documentation",
                icon: "",
            },
        });

        expect(plugin).toMatchSnapshot();
    });
});
