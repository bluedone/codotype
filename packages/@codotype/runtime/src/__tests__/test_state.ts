import { MockRuntime } from "../MockRuntime";
import { CodotypeGenerator } from "../generator";
import { testState, inflateProject, InflatedProject } from "@codotype/core";
import {
    CodotypeRuntimeConstructorOptions,
    RuntimeLogLevel,
    ConstructorOptions,
    GeneratorOptions,
    RuntimeAdaptor,
} from "../types";

// // // //

export const project: InflatedProject = inflateProject({
    // @ts-ignore
    project: { schemas: [testState.userSchema, testState.movieSchema] },
});

export const runtimeConstructorOptions: CodotypeRuntimeConstructorOptions = {
    cwd: "/test-cwd/",
    logLevel: RuntimeLogLevel.verbose,
};

export const baseGeneratorOptions: GeneratorOptions = {
    dest: "destination",
    resolved: "my/resolved/path",
    project,
    plugin: testState.cdkGeneratorMeta,
    runtime: new MockRuntime(runtimeConstructorOptions),
};

export const generatorPrototype: ConstructorOptions = {
    write: jest.fn(),
    compileInPlace: jest.fn(),
    forEachSchema: jest.fn(),
    forEachRelation: jest.fn(),
    forEachReverseRelation: jest.fn(),
};

export const generatorPrototype01: ConstructorOptions = {
    name: "ModuleComponents",
    async write({ project, runtime }) {
        runtime.writeFile("", '{\nname: "project"\n}');
    },
    async forEachSchema({ schema, runtime }) {
        // Destination for module / components directory
        const moduleComponentsDest =
            "components/" + schema.identifiers.singular.snake + "_editor/";

        // Ensures module components directory
        await runtime.ensureDir(moduleComponentsDest);

        // TODO - ensure page here
        await runtime.renderComponent({
            src: "page.tsx.ejs",
            dest: `pages/${schema.identifiers.plural.snake}.tsx`,
            data: { schema },
        });
    },
};

// // Defines typed generator constant
export const generatorPrototype02: ConstructorOptions = {
    name: "Fullstack TypeScript Generator",
    async write(this: CodotypeGenerator) {
        await this.composeWith("./base");
        await this.composeWith("./rest-api");
        await this.composeWith("./react-components");
        await this.composeWith("./react-components/form");
    },
};
