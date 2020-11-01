import { buildDefaultProjectInput } from "../buildDefaultProject";
import {
    testState,
    PluginMetadata,
    ProjectInput,
    CreatedByValues,
} from "../../";

// // // //

const testCases: [string, PluginMetadata][] = [
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
                        createdBy: CreatedByValues.plugin,
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
                        createdBy: CreatedByValues.plugin,
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
            const expectedProject: ProjectInput = buildDefaultProjectInput(
                testCase[1],
            );
            expect(expectedProject).toMatchSnapshot();
        });
    });
});
