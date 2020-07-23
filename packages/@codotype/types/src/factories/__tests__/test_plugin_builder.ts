import { PluginBuilder } from "../Plugin";

// // // //

describe("factory", () => {
  test("works", () => {
    const plugin = new PluginBuilder({
      id: "my-codotype-plugin",
      label: "My Codotype Plugin",
      description: "My Codotype Plugin description",
      project_path: "my_codotype_plugin",
    });

    expect(plugin).toMatchSnapshot();
  });
});
