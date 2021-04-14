import * as React from "react";
import dynamic from "next/dynamic";
import { PluginFetcher } from "@codotype/ui/dist/src/pages/web_runtime/PluginFetcher";
import { PluginRunner } from "@codotype/ui/dist/src/pages/web_runtime/PluginRunner";
import { ProjectEditor } from "@codotype/ui/dist/src/components/ProjectEditor";
import { AppContainer } from "@codotype/ui/dist/src/components/AppContainer";

const LocalStorageProvider = dynamic(
    // @ts-ignore
    import("@codotype/ui/dist/src/pages/web_runtime/LocalStorageProvider").then(
        mod => mod.LocalStorageProvider,
    ),
    {
        ssr: false,
    },
);

// // // //

export default () => {
    if (typeof window === "undefined") {
        return <p>Server Render</p>;
    }
    return (
        <PluginFetcher>
            {({ plugins }) => (
                <PluginRunner plugin={plugins[0]}>
                    {({ generateCode }) => (
                        // @ts-ignore
                        <LocalStorageProvider plugin={plugins[0]}>
                            {/* @ts-ignore */}
                            {({ projectInput, clearProject, setProject }) => (
                                <AppContainer plugin={plugins[0]}>
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
                                </AppContainer>
                            )}
                        </LocalStorageProvider>
                    )}
                </PluginRunner>
            )}
        </PluginFetcher>
    );
};
