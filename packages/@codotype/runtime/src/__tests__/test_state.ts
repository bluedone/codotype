import { RuntimeProxyAdapter } from "../utils/runtimeProxyAdapter";
import {
    testState,
    RuntimeLogLevels,
    normalizeProjectInput,
    RuntimeConstructorParams,
    FileOverwriteBehaviors,
    Project,
    RuntimeInjectorProps,
    GeneratorConstructorParams,
    buildTokenCasing,
} from "@codotype/core";
// import { LocalFileSystemAdapter } from "../LocalFileSystemAdapter";
import { InMemoryFileSystemAdapter } from "../InMemoryFileSystemAdapter";
import { NodeRuntime } from "../node-runtime";

// // // //

export const project: Project = normalizeProjectInput({
    projectInput: {
        schemas: [testState.userSchema, testState.movieSchema],
        relations: [],
        configuration: {},
        pluginID: "123",
        pluginVersion: "0.1.1",
        id: "project-id",
        identifiers: buildTokenCasing("My Project"),
    },
});

export const runtimeConstructorOptions: RuntimeConstructorParams = {
    cwd: "/test-cwd/",
    logLevel: RuntimeLogLevels.verbose,
    fileOverwriteBehavior: FileOverwriteBehaviors.force,
    fileSystemAdapter: new InMemoryFileSystemAdapter(),
};

export const baseGeneratorOptions: RuntimeInjectorProps = {
    dest: "destination",
    resolved: "my/resolved/path",
    project,
    plugin: testState.cdkPluginMeta,
    runtime: new NodeRuntime(runtimeConstructorOptions),
};

export const generatorPrototype: GeneratorConstructorParams = {
    name: "Prototype Generator",
    write: jest.fn(),
    compileInPlace: [],
    forEachSchema: jest.fn(),
    forEachRelation: jest.fn(),
    forEachReferencedBy: jest.fn(),
};

export const generatorPrototype01: GeneratorConstructorParams = {
    name: "ModuleComponents",
    async write({ runtime }) {
        runtime.writeFile("", '{\nname: "project"\n}');
    },
    async forEachSchema({ schema, runtime }) {
        // Destination for module / components directory
        const moduleComponentsDest =
            "components/" + schema.identifiers.singular.snake + "_editor/";

        // Ensures module components directory
        await runtime.ensureDir(moduleComponentsDest);

        // WRites the page.tsx.ejs template
        await runtime.renderComponent({
            src: "page.tsx.ejs",
            dest: `pages/${schema.identifiers.plural.snake}.tsx`,
            data: { schema },
        });
    },
};

// // Defines typed generator constant
export const generatorPrototype02: GeneratorConstructorParams = {
    name: "Fullstack TypeScript Generator",
    async write(this: RuntimeProxyAdapter) {
        await this.composeWith("./base");
        await this.composeWith("./rest-api");
        await this.composeWith("./react-components");
        await this.composeWith("./react-components/form");
    },
};
