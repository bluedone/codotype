import { NodeRuntime } from "../node-runtime";
import { RuntimeProxyAdapter } from "../utils/runtimeProxyAdapter";
import {
    project,
    baseRuntimeAdapterProps,
    generatorPrototype,
    generatorPrototype01,
} from "./test_state";
import {
    RuntimeLogLevels,
    FileOverwriteBehaviors,
    RuntimeProps,
    RuntimeAdapterProps,
} from "@codotype/core";
import { InMemoryFileSystemAdapter } from "../InMemoryFileSystemAdapter";
import { runGenerator } from "../utils/runGenerator";

// // // //
// TODO - clean up these dang tests!
// TODO - clean up these dang tests!
// TODO - clean up these dang tests!
// TODO - clean up these dang tests!
// TODO - clean up these dang tests!

describe("getTemplatePath method", () => {
    it("should define correct template path", () => {
        const dest = "destination";
        const templateRelativePath = "template.json";
        const generatorResolvedPath = "my/resolved/path";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeProps: RuntimeProps = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeProps);

        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            dest,
            generatorResolvedPath,
        };
        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            runtimeAdapterProps,
        );

        // Ensures absolute path to template to be correct
        const templateFullPath = runtime.getTemplatePath(
            generatorInstance.generatorResolvedPath,
            templateRelativePath,
        );
        expect(templateFullPath).toBe(
            `${generatorResolvedPath}/templates/${templateRelativePath}`,
        );
    });
});

describe("getDestinationPath method", () => {
    it("should define correct destination path", () => {
        const dest = "destination";
        const dirName = "testyMcTestface";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeProps: RuntimeProps = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeProps);

        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            dest,
            generatorResolvedPath: __dirname,
        };

        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            runtimeAdapterProps,
        );

        const destinationPath = runtime.getDestinationPath(dest, dirName);
        expect(destinationPath).toBe(`${dest}/${dirName}`);
    });
});

describe("ensureDir method", () => {
    it("should properly define NodeRuntime._mocks_.ensuredDir", () => {
        const dest = "destination";
        const dirName = "testyMcTestface";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeProps: RuntimeProps = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeProps);

        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            dest,
            generatorResolvedPath: __dirname,
        };
        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            runtimeAdapterProps,
        );

        generatorInstance.ensureDir(dirName).then(() => {
            expect(fileSystemAdapter.files).toMatchSnapshot();
        });
    });
});

describe("renderComponent", () => {
    test("renders", async () => {
        const dest = "destination";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeProps: RuntimeProps = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeProps);

        // // // //
        // NOTE - all of this is handled by the runtime -> should this be handled inside the RuntimeGeneratorAdapter?
        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            dest,
            generatorResolvedPath: __dirname, // NOTE - need to use __dirname here beacuse the `templates` directory sits next to this test
        };

        // Runs the generator
        await runGenerator({
            project,
            runtimeAdapter: new RuntimeProxyAdapter(
                generatorPrototype01,
                runtimeAdapterProps,
            ),
        });

        expect(fileSystemAdapter.files).toMatchSnapshot();
    });
});
