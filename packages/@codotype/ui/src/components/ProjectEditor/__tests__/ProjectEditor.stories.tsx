import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProjectEditor } from "../component";
import { buildDefaultProjectInput, ProjectInput } from "@codotype/core";
import { Story } from "../../Story";
import { dummyPluginMetadata } from "./test_state";
import { ConfigurationGroupHeader } from "../../ConfigurationInput";

// // // //

const chromeExtensionPlugin = {
    ...dummyPluginMetadata,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png",
};

const dummyProject: ProjectInput = buildDefaultProjectInput(
    chromeExtensionPlugin,
);

// // // //

const stories = storiesOf("Components/ProjectEditor/Layout", module)

stories.add("renders", () => {
    const [project, setProject] = React.useState<ProjectInput>(dummyProject);
    return (
        <Story>
            <ProjectEditor
                plugin={chromeExtensionPlugin}
                projectInput={project}
                onClickGenerate={() => {
                    console.log("Generate Project!");
                    console.log(project);
                }}
                onResetProject={() => {
                    console.log("RESET PROJECT");
                    console.log(project);
                }}
                onChange={(updatedProject: ProjectInput) => {
                    console.log("onChange!");
                    console.log(updatedProject);
                    setProject(updatedProject);
                }}
            />
            <hr />
            <pre>{JSON.stringify(project, null, 4)}</pre>
        </Story>
    );
});

// // // //

stories.add("w/ props.children", () => {
    const [project, setProject] = React.useState<ProjectInput>(dummyProject);
    return (
        <ProjectEditor
            plugin={chromeExtensionPlugin}
            projectInput={project}
            onClickGenerate={() => {
                console.log("Generate Project!");
                console.log(project);
            }}
            onResetProject={() => {
                console.log("RESET PROJECT");
                console.log(project);
            }}
            onChange={(updatedProject: ProjectInput) => {
                console.log("onChange!");
                console.log(updatedProject);
                setProject(updatedProject);
            }}
        >
            {({
                defaultComponent,
                value,
                selectedConfigurationGroup,
                onChange,
            }) => {

                // Render custom input for "landingPage" section
                if (
                    selectedConfigurationGroup.identifier ===
                    "home"
                ) {
                    return (
                        <div className="grid grid-cols-12 mt-4">
                            <div className="col-span-12">
                                <ConfigurationGroupHeader
                                    value={value}
                                    onChange={
                                        onChange
                                    }
                                    configurationGroup={
                                        selectedConfigurationGroup
                                    }
                                />
                                <div>
                                    <input
                                        value={
                                            value.string
                                        }
                                        onChange={e => {
                                            const val = e.currentTarget.value

                                            onChange(
                                                {
                                                    string: val
                                                },
                                            );
                                        }}
                                    />
                                </div>
                            </div>
                        </div>
                    );
                } else {
                    return defaultComponent;
                }
            }}
        </ProjectEditor>
    );
});