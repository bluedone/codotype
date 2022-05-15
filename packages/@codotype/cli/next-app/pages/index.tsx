import { NextPage } from "next";
import * as React from "react";
import dynamic from "next/dynamic";
import { PluginFetcher } from "@codotype/ui/dist/src/pages/web_runtime/PluginFetcher";
import { PluginRunner } from "@codotype/ui/dist/src/pages/web_runtime/PluginRunner";
import { ProjectEditor } from "@codotype/ui/dist/src/components/ProjectEditor";
import { AppContainer } from "@codotype/ui/dist/src/components/AppContainer";
import { PluginMetadata, ProjectInput } from "@codotype/core";

// // // //

interface ChildProps {
    projectInput: ProjectInput;
    setProject: (updatedProjectInput: ProjectInput) => void;
    clearProject: () => void;
    darkMode: boolean;
    setDarkMode: (darkMode: boolean) => void;
}

interface LocalStorageProviderProps {
    plugin: PluginMetadata;
    children: (childProps: ChildProps) => React.ReactNode;
}

const LocalStorageProvider: React.ComponentType<LocalStorageProviderProps> = dynamic(
    import("@codotype/ui/dist/src/pages/web_runtime/LocalStorageProvider").then(
        (mod) => mod.LocalStorageProvider,
    ),
    {
        ssr: false,
    },
);

// // // //

const Page: NextPage = () => {
    if (typeof window === "undefined") {
        return <p>Server Render</p>;
    }

    return (
        <PluginFetcher>
            {({ plugins }) => (
                <PluginRunner plugin={plugins[0]}>
                    {({ generateCode }) => (
                        <LocalStorageProvider plugin={plugins[0]}>
                            {({
                                projectInput,
                                clearProject,
                                setProject,
                                darkMode,
                                setDarkMode,
                            }) => (
                                <AppContainer
                                    plugin={plugins[0]}
                                    darkMode={darkMode}
                                    setDarkMode={setDarkMode}
                                >
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

export default Page;
