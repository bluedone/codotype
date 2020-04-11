import * as React from "react";
import { storiesOf } from "@storybook/react";
import { WebRuntime } from "../component";
import { Project, GeneratorMeta } from "@codotype/types";
import { Story } from "@src/components/dev";
import { RuntimeProvider } from "@src/components/runtime_provider";
import { ProjectEditor } from "@src/components/project_editor";
import { cdkGeneratorMeta } from "@src/components/__tests__/test_state";
import { dummyGeneratorMeta } from "@src/components/project_editor/__tests__/test_state";

// // // //

const stories: [string, GeneratorMeta][] = [
    ["w/ schemas", dummyGeneratorMeta],
    ["w/o schemas", cdkGeneratorMeta],
];

// // // //

const storyCollection = storiesOf("Pages/WebRuntime", module);

stories.forEach(story => {
    storyCollection.add(story[0], () => {
        return (
            <Story>
                <WebRuntime generator={story[1]}>
                    {({ generator, project, setProject, clearProject }) => (
                        <RuntimeProvider>
                            {({ generateCode }) => (
                                <React.Fragment>
                                    <ProjectEditor
                                        generator={generator}
                                        project={project}
                                        onClickGenerate={() => {
                                            generateCode({
                                                project,
                                                generator,
                                            });
                                        }}
                                        onResetProject={clearProject}
                                        onChange={(updatedProject: Project) => {
                                            setProject(updatedProject);
                                        }}
                                    />
                                </React.Fragment>
                            )}
                        </RuntimeProvider>
                    )}
                </WebRuntime>
            </Story>
        );
    });
});
