import { NodeRuntime } from "../node-runtime";
import { RuntimeProxyAdapter } from "../utils/runtimeProxyAdapter";
import {
    project,
    baseRuntimeAdapterProps,
    generatorPrototype,
    generatorPrototype01,
} from "./test_state";
import {
    FileOverwriteBehaviors,
    RuntimeProps,
    RuntimeAdapterProps,
    Runtime,
    RuntimeLogBehaviors,
} from "@codotype/core";
import { InMemoryFileSystemAdapter } from "../InMemoryFileSystemAdapter";
import { runGenerator } from "../utils/runGenerator";

// // // //

const destinationPath = "destination";

function getTestRuntime(): {
    runtime: Runtime;
    fileSystemAdapter: InMemoryFileSystemAdapter;
} {
    const fileSystemAdapter = new InMemoryFileSystemAdapter();
    const runtimeProps: RuntimeProps = {
        cwd: "/test-cwd/",
        logBehavior: RuntimeLogBehaviors.suppress,
        fileOverwriteBehavior: FileOverwriteBehaviors.force,
        fileSystemAdapter,
    };
    const runtime = new NodeRuntime(runtimeProps);
    return { runtime, fileSystemAdapter };
}

// // // //

describe("getTemplatePath method", () => {
    it("should define correct template path", () => {
        const templateRelativePath = "template.json";
        const generatorResolvedPath = "my/resolved/path";
        const { runtime } = getTestRuntime();

        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            destinationPath,
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
        const dirName = "testyMcTestface";
        const { runtime } = getTestRuntime();

        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            destinationPath,
            generatorResolvedPath: __dirname,
        };

        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            runtimeAdapterProps,
        );

        const destPath = runtime.getDestinationPath(destinationPath, dirName);
        expect(destPath).toBe(`${destinationPath}/${dirName}`);
    });
});

describe("ensureDir method", () => {
    it("should properly define NodeRuntime._mocks_.ensuredDir", () => {
        const dirName = "testyMcTestface";
        const { runtime, fileSystemAdapter } = getTestRuntime();

        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            destinationPath,
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
        const { runtime, fileSystemAdapter } = getTestRuntime();

        // // // //
        // NOTE - all of this is handled by the runtime -> should this be handled inside the RuntimeGeneratorAdapter?
        const runtimeAdapterProps: RuntimeAdapterProps = {
            ...baseRuntimeAdapterProps,
            runtime,
            destinationPath,
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
