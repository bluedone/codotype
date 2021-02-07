import { NodeRuntime } from "../../node-runtime";
import { RuntimeLogLevels, FileOverwriteBehaviors } from "@codotype/core";
import { InMemoryFileSystemAdapter } from "../../InMemoryFileSystemAdapter";
import { build } from "../../__tests__/test_state";

// // // //

describe("prepareProjectBuildDestination", () => {
    test("creates .codotype directory + codotype-project.json", async () => {
        // Defines InMemoryFileSystemAdapter so we can run snapshot tests against fileSystemAdapter.files
        const fileSystemAdapter = new InMemoryFileSystemAdapter();

        // Defines a new NodeRuntime w/ fileSystemAdapter
        const runtime = new NodeRuntime({
            cwd: "/test-cwd/",
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        });

        // Executes the project build
        // NOTE - runtime.execute runs the prepareProjectBuildDestination function
        await runtime.execute({ build });

        // Ensures InMemoryFileSystemAdapter contents match snapshots
        expect(fileSystemAdapter.files).toMatchSnapshot();
    });
});
