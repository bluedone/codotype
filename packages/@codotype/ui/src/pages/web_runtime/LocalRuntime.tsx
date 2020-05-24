import * as React from "react";
import { GeneratorFetcher } from "./GeneratorFetcher";
import { LocalStorageProvider } from "./LocalStorageProvider";
import { GeneratorRunner } from "./GeneratorRunner";
import { ProjectEditor } from "../../components/project_editor";

// // // //

/**
 * LocalRuntime
 * Component designed to handle all the heavy lifting for running a generator locally using @codotype/cli
 */
export function LocalRuntime() {
    return (
        <GeneratorFetcher>
            {({ generators }) => (
                <GeneratorRunner generator={generators[0]}>
                    {({ generateCode }) => (
                        <LocalStorageProvider generator={generators[0]}>
                            {({ project, clearProject, setProject }) => (
                                <ProjectEditor
                                    generator={generators[0]}
                                    project={project}
                                    onClickGenerate={() => {
                                        generateCode({
                                            project,
                                        });
                                    }}
                                    onResetProject={clearProject}
                                    onChange={setProject}
                                />
                            )}
                        </LocalStorageProvider>
                    )}
                </GeneratorRunner>
            )}
        </GeneratorFetcher>
    );
}
