import { NodeRuntime } from "../node-runtime";
import { RuntimeProxyAdapter } from "../utils/runtimeProxyAdapter";
import {
    project,
    baseGeneratorOptions,
    generatorPrototype,
    generatorPrototype01,
} from "./test_state";
import {
    RuntimeLogLevels,
    FileOverwriteBehaviors,
    RuntimeConstructorParams,
} from "@codotype/core";
import { InMemoryFileSystemAdapter } from "../InMemoryFileSystemAdapter";
import { runGenerator } from "../utils/runGenerator";

// // // //

describe("templatePath method", () => {
    it("should define correct template path", () => {
        const dest = "destination";
        const template = "template.json";
        const resolved = "my/resolved/path";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeConstructorOptions: RuntimeConstructorParams = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved,
        };
        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            generatorOptions,
        );

        const templatePath = generatorInstance.templatePath(template);
        expect(templatePath).toBe(`${resolved}/templates/${template}`);
    });
});

describe("destinationPath method", () => {
    it("should define correct destination path", () => {
        const dest = "destination";
        const dirName = "testyMcTestface";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeConstructorOptions: RuntimeConstructorParams = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: __dirname,
        };

        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            generatorOptions,
        );

        const destinationPath = generatorInstance.destinationPath(dirName);
        expect(destinationPath).toBe(`${dest}/${dirName}`);
    });
});

describe("ensureDir method", () => {
    it("should properly define NodeRuntime._mocks_.ensuredDir", () => {
        const dest = "destination";
        const dirName = "testyMcTestface";

        const fileSystemAdapter = new InMemoryFileSystemAdapter();
        const runtimeConstructorOptions: RuntimeConstructorParams = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeConstructorOptions);

        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: __dirname,
        };
        const generatorInstance = new RuntimeProxyAdapter(
            generatorPrototype,
            generatorOptions,
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
        const runtimeConstructorOptions: RuntimeConstructorParams = {
            cwd: "/test-cwd/",
            logLevel: RuntimeLogLevels.verbose,
            fileOverwriteBehavior: FileOverwriteBehaviors.force,
            fileSystemAdapter,
        };
        const runtime = new NodeRuntime(runtimeConstructorOptions);

        // // // //
        // NOTE - all of this is handled by the runtime -> should this be handled inside the RuntimeGeneratorAdapter?
        const generatorOptions = {
            ...baseGeneratorOptions,
            runtime,
            dest,
            resolved: __dirname, // NOTE - need to use __dirname here beacuse the `templates` directory sits next to this test
        };

        const runtimeProxyAdapter = new RuntimeProxyAdapter(
            generatorPrototype01,
            generatorOptions,
        );

        await runGenerator({
            project,
            runtimeProxyAdapter,
        });

        expect(fileSystemAdapter.files).toMatchSnapshot();
    });
});
