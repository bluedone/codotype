import * as fs from "fs";
import { NodeRuntime } from "../node-runtime";
import {
    buildDefaultProjectInput,
    Runtime,
    ProjectBuild,
    RuntimeLogLevels,
} from "@codotype/core";
import { resolve } from "path";
import { LocalFileSystemAdapter } from "../LocalFileSystemAdapter";

// // // //

// TODO - test each method with NodeRuntime
describe("testing @codotype/runtime v2", () => {
    // test("testing @codotype/runtime v2", async () => {
    //     const mockRuntime: Runtime = new MockRuntime({
    //         cwd: "/",
    //         logLevel: RuntimeLogLevels.verbose,
    //         fileOverwriteBehavior: "force",
    //     });

    //     // console.log(mockRuntime);

    //     const res = await mockRuntime.writeFile(
    //         "path/to/file.js",
    //         "compiledTemplateString",
    //     );

    //     const exists = await mockRuntime.fileExists("path/to/file.js");
    //     expect(exists).toBe(true);

    //     const compared = await mockRuntime.compareFile(
    //         "path/to/file.js",
    //         "compiledTemplateString",
    //     );
    //     expect(compared).toBe(true);

    //     const comparedFalse = await mockRuntime.compareFile(
    //         "path/to/file.js",
    //         "compiledTemplateString",
    //     );
    //     expect(comparedFalse).toBe(comparedFalse);
    // });

    test("testing @codotype/runtime composeWith", async () => {
        // Defines CWD for new NodeRuntime
        // Uses `__tests__/__snapshots__` dir as the CWD
        const cwd: string = `${__dirname}/__snapshots__`;

        // Instantiates new CodotypeRuntime w/ verbose LogLevel
        const nodeRuntime: Runtime = new NodeRuntime({
            cwd,
            logLevel: RuntimeLogLevels.suppress,
            fileOverwriteBehavior: "force",
            fileSystemAdapter: new LocalFileSystemAdapter(),
        });

        // Registers the mock_plugin
        // NOTE - the "relativePath" value here is relative to CWD, up one directory
        const pluginRegistration = await nodeRuntime.registerPlugin({
            relativePath: "../mock_plugin",
        });

        // If pluginRegistration is null => return
        // Just needs to be here to ensure that plugin registers successfully before referencing `PluginRegistration
        if (pluginRegistration === null) {
            return;
        }

        // Defines default ProjectInput
        const projectInput = buildDefaultProjectInput(
            pluginRegistration.pluginMetadata,
        );

        // Defines the ProjectBuild
        const build: ProjectBuild = {
            id: "test-project",
            projectInput,
        };

        // Execute the build via nodeRuntime
        await nodeRuntime.execute({ build });

        // Define flags indicating whether or not file creation occured as anticipated
        const txtExists = fs.existsSync(
            resolve(cwd, ".codotype-out/test-project/new_project/Hello.txt"),
        );
        const readmeExists = fs.existsSync(
            resolve(
                cwd,
                ".codotype-out/test-project/new_project/README-TEST.md",
            ),
        );

        // Tests ComposeWithOptions.outputDirectoryScope
        const scopedFile = fs.existsSync(
            resolve(
                cwd,
                ".codotype-out/test-project/new_project/scoped-output/SCOPED-TEST.md",
            ),
        );

        // Asserts existence of files
        expect(txtExists).toBe(true);
        expect(readmeExists).toBe(true);
        expect(scopedFile).toBe(true);
    });
});
