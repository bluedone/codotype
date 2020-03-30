import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WebRuntime } from "../component";
import { Project } from "../../../components/types";
import { Story } from "@src/components/dev";
import { RuntimeProvider } from "@src/components/runtime_provider";
import { ProjectEditor } from "@src/components/project_editor";

// // // //

storiesOf("Pages/WebRuntime", module).add("render", () => {
    return (
        <Story>
            <WebRuntime>
                {({ generator, project, setProject, clearProject }) => (
                    <RuntimeProvider>
                        {({ generateCode }) => (
                            <React.Fragment>
                                <ProjectEditor
                                    generator={generator}
                                    project={project}
                                    onClickGenerate={() => {
                                        generateCode({ project, generator });
                                    }}
                                    onChange={(updatedProject: Project) => {
                                        setProject(updatedProject);
                                    }}
                                />
                                <button onClick={clearProject}>clear</button>
                            </React.Fragment>
                        )}
                    </RuntimeProvider>
                )}
            </WebRuntime>
        </Story>
    );
});
