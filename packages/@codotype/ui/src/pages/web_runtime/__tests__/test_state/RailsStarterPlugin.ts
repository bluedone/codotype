import { pluginReadme } from "../../../../components/MarkdownRenderer/__tests__/test_state";
import {
    PluginMetadata,
    PropertyTypes,
    Primitives,
    ConfigurationGroup,
} from "@codotype/core";
import { SchemaEditorKitchenSink } from "./SchemaEditorConfiguration";

// // // //
// Rails Starter Plugin

// {
//     ...cdkPluginMeta,
//     content: {
//         ...cdkPluginMeta.content,
//         documentation: pluginReadme,
//     },
//     configurationGroups: [
//         {
//             ...testState.ComponentBuilderConfigurationGroup,
//             layoutVariant: GroupLayoutVariants.LIST,
//         },
//         testState.SideBySideConfigurationGroup,
//         {
//             ...testState.SideBySideConfigurationGroup,
//             content: {
//                 ...testState.SideBySideConfigurationGroup.content,
//                 label: "API Actions",
//             },
//             identifier: "api_actions",
//             properties: [ApiActionsProperty],
//         },
//         {
//             ...testState.SideBySideConfigurationGroup,
//             content: {
//                 ...testState.SideBySideConfigurationGroup.content,
//                 label: "Nested API Actions",
//             },
//             identifier: "nested_api_actions",
//             properties: [NestedCollectionProperty],
//         },
//     ],
//     identifier: "chrome_extension_plugin_05", // unique ID for the plugin
// },
// ],

// // // //
// Hosting
const hostingConfigurationGroup: ConfigurationGroup = new Primitives.ConfigurationGroup(
    {
        identifier: "hosting",
        content: {
            label: "Hosting",
            description: "Configure the hosting of your Rails app",
            icon: "",
            documentation: "",
        },
        properties: [
            new Primitives.ConfigurationProperty({
                identifier: "platform",
                content: {
                    label: "Platform",
                    description: "How would you like to host your Rails app?",
                    icon:
                        "https://cdn4.iconfinder.com/data/icons/colicon/24/cloud-512.png",
                    documentation: "",
                },
                type: PropertyTypes.DROPDOWN,
                defaultValue: "docker",
                selectOptions: [
                    { label: "Docker", value: "docker" },
                    { label: "EC2", value: "ec2" },
                ],
            }),
        ],
    },
);

// // // //
// Export Plugin

export const RailsStarterPlugin: PluginMetadata = new Primitives.Plugin({
    identifier: "rails-starter",
    project_path: "rails-starter",
    content: {
        label: "Rails + Postgres Starter",
        description:
            "Rails + Postgres + User Authentication + Scaffolding Starter",
        icon: "https://miro.medium.com/max/500/1*cPh7ujRIfcHAy4kW2ADGOw.png",
        documentation: pluginReadme,
    },
    configurationGroups: [hostingConfigurationGroup],
    schemaEditorConfiguration: SchemaEditorKitchenSink,
});
