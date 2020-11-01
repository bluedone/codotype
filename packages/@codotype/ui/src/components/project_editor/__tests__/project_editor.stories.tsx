import * as React from "react";
import { storiesOf } from "@storybook/react";
import { ProjectEditor } from "../component";
import { Project, testState, buildDefaultProject } from "@codotype/core";
import { Story } from "../../dev";
import { dummyPluginMetadata } from "./test_state";

// // // //

const chromeExtensionPlugin = {
    ...dummyPluginMetadata,
    icon:
        "https://res.cloudinary.com/codotype/image/upload/v1553197653/tech-logos/nodejs.png",
};

const dummyProject: Project = buildDefaultProject(chromeExtensionPlugin);
dummyProject.schemas.push(testState.movieSchema);
dummyProject.schemas.push(testState.userSchema);

storiesOf("ProjectEditor/Layout", module).add("renders", () => {
    const [project, setProject] = React.useState<Project>(dummyProject);
    return (
        <Story>
            <ProjectEditor
                generator={chromeExtensionPlugin}
                project={project}
                onClickGenerate={() => {
                    console.log("Generate Project!");
                    console.log(project);
                }}
                onResetProject={() => {
                    console.log("RESET PROJECT");
                    console.log(project);
                }}
                onChange={(updatedProject: Project) => {
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
