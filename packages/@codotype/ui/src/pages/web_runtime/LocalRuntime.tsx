import * as React from "react";
import { PluginFetcher } from "./GeneratorFetcher";
import { LocalStorageProvider } from "./LocalStorageProvider";
import { PluginRunner } from "./GeneratorRunner";
import { ProjectEditor } from "../../components/ProjectEditor";

// // // //

/**
 * LocalRuntime
 * Component designed to handle all the heavy lifting for running a generator locally using @codotype/cli
 */
export function LocalRuntime() {
    return (
        <PluginFetcher>
            {({ plugins }) => (
                <PluginRunner plugin={plugins[0]}>
                    {({ generateCode }) => (
                        <LocalStorageProvider plugin={plugins[0]}>
                            {({ projectInput, clearProject, setProject }) => (
                                <ProjectEditor
                                    plugin={plugins[0]}
                                    projectInput={projectInput}
                                    onClickGenerate={() => {
                                        generateCode({
                                            projectInput,
                                        });
                                    }}
                                    onResetProject={clearProject}
                                    onChange={setProject}
                                />
                            )}
                        </LocalStorageProvider>
                    )}
                </PluginRunner>
            )}
        </PluginFetcher>
    );
}
