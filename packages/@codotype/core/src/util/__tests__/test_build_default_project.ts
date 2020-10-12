import { buildDefaultProject } from "../buildDefaultProject";
import { testState, GeneratorMeta, Project, SchemaSource } from "../../";

// // // //

const testCases: [string, GeneratorMeta][] = [
    ["cdkGeneratorMeta", testState.cdkGeneratorMeta],
    ["dummyGeneratorMeta", testState.dummyGeneratorMeta],
    [
        "generator w/ defaultSchemas, no schemaEditorConfiguration.configurationGroups",
        {
            ...testState.dummyGeneratorMeta,
            schemaEditorConfiguration: {
                ...testState.dummyGeneratorMeta.schemaEditorConfiguration,
                defaultSchemas: [
                    {
                        ...testState.userSchema,
                        locked: true,
                        source: SchemaSource.GENERATOR,
                    },
                ],
                configurationGroups: [],
            },
        },
    ],
    [
        "generator w/ defaultSchemas + schemaEditorConfiguration.configurationGroups",
        {
            ...testState.dummyGeneratorMeta,
            schemaEditorConfiguration: {
                ...testState.dummyGeneratorMeta.schemaEditorConfiguration,
                defaultSchemas: [
                    {
                        ...testState.userSchema,
                        locked: true,
                        source: SchemaSource.GENERATOR,
                    },
                ],
                configurationGroups: [testState.ApiExamplesConfigurationGroup],
            },
        },
    ],
];

describe("/buildDefaultProject", () => {
    testCases.forEach((testCase) => {
        test(testCase[0], () => {
            const expectedProject: Project = buildDefaultProject(testCase[1]);
            expect(expectedProject).toMatchSnapshot();
        });
    });
});
