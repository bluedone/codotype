import { RuntimeProxyAdapter } from "../utils/runtimeProxyAdapter";
import {
    testState,
    RuntimeLogLevels,
    normalizeProjectInput,
    RuntimeProps,
    FileOverwriteBehaviors,
    Project,
    RuntimeAdapterProps,
    GeneratorProps,
    buildTokenCasing,
    ProjectInput,
    ProjectBuild,
} from "@codotype/core";
import { InMemoryFileSystemAdapter } from "../InMemoryFileSystemAdapter";
import { NodeRuntime } from "../node-runtime";

// // // //

export const projectInput: ProjectInput = {
    schemas: [testState.userSchema, testState.movieSchema],
    relations: [],
    configuration: {},
    pluginID: "123",
    pluginVersion: "0.1.1",
    id: "project-id",
    identifiers: buildTokenCasing("My Project"),
};

export const project: Project = normalizeProjectInput({
    projectInput,
});

export const build: ProjectBuild = {
    projectInput,
    startTime: new Date().toISOString(),
    endTime: new Date().toISOString(),
};

export const runtimeProps: RuntimeProps = {
    cwd: "/test-cwd/",
    logLevel: RuntimeLogLevels.verbose,
    fileOverwriteBehavior: FileOverwriteBehaviors.force,
    fileSystemAdapter: new InMemoryFileSystemAdapter(),
};

export const baseRuntimeAdapterProps: RuntimeAdapterProps = {
    dest: "destination",
    generatorResolvedPath: "my/resolved/path",
    project,
    plugin: testState.cdkPluginMeta,
    runtime: new NodeRuntime(runtimeProps),
};

export const generatorPrototype: GeneratorProps = {
    name: "Prototype Generator",
    write: jest.fn(),
    compileInPlace: [],
    forEachSchema: jest.fn(),
    forEachRelation: jest.fn(),
    forEachReferencedBy: jest.fn(),
};

// // // //

const jsonFileContents: string =
    '{name: "project", "main": "dist/index","types": "dist/index","files": ["dist"],"repository": {"type": "git","url": "git+https://github.com/codotype/codotype-runtime.git"},"author": "Alexander Schwartzberg","license": "MIT"}';

const htmlFileContents: string =
    "<html><head><title>Page Title</title></head><body><h1>Hello, HTML!</h1></body></html>";

export const generatorPrototype01: GeneratorProps = {
    name: "ModuleComponents",
    async write({ runtime }) {
        // JSON
        await runtime.writeFile("package.json", jsonFileContents, {
            prettify: {
                parser: "json",
            },
        });
        await runtime.writeFile("package-no-prettify.json", jsonFileContents);

        // HTML
        await runtime.writeFile("index.html", htmlFileContents, {
            prettify: {
                parser: "json",
            },
        });
        await runtime.writeFile("index-no-prettify.html", htmlFileContents);

        await runtime.writeFile("README.md", "# Your New Project");

        // Writes the prettify.js.ejs template w/ prettify.semi = true option
        await runtime.renderComponent({
            src: "prettify-test.js.ejs",
            dest: `prettify-test.js`,
            data: {},
            options: {
                prettify: {
                    parser: "babel",
                    semi: true,
                },
            },
        });

        // Writes the prettify.js.ejs template w/ prettify.semi = false
        await runtime.renderComponent({
            src: "prettify-test.js.ejs",
            dest: `prettify-test-no-semi.js`,
            data: {},
            options: {
                prettify: {
                    parser: "babel",
                    semi: false,
                },
            },
        });
    },
    async forEachSchema({ schema, runtime }) {
        // Writes the page.tsx.ejs template
        await runtime.renderComponent({
            src: "page.tsx.ejs",
            dest: `pages/${schema.identifiers.plural.snake}.tsx`,
            data: { schema },
        });
    },
};
