import * as React from "react";
import {
    PluginMetadata,
    ProjectInput,
    buildDefaultProjectInput,
} from "@codotype/core";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackComponent } from "./ErrorBoundary";

// // // //

function getLocalStorageKey(plugin: PluginMetadata): string {
    return `${plugin.identifier}-${plugin.version}`;
}

function writeProjectToLocalStorage(props: {
    project: ProjectInput;
    plugin: PluginMetadata;
}) {
    localStorage.setItem(
        getLocalStorageKey(props.plugin),
        JSON.stringify(props.project),
    );
}

function clearLocalStorage(props: { plugin: PluginMetadata }) {
    localStorage.removeItem(getLocalStorageKey(props.plugin));
}

function readProjectFromLocalStorage(props: {
    plugin: PluginMetadata;
}): ProjectInput {
    try {
        const localStorageKey = getLocalStorageKey(props.plugin);
        // @ts-ignore
        const localStorageValue: string = localStorage.getItem(localStorageKey);
        if (!localStorageValue) {
            return buildDefaultProjectInput(props.plugin);
        }
        const parsedProject: ProjectInput = JSON.parse(localStorageValue);
        return parsedProject;
    } catch (e) {
        return buildDefaultProjectInput(props.plugin);
    }
}

const DARK_MODE_LOCAL_STORAGE_KEY = "codotype-dark-mode";
function readDarkmodeFromLocalStorage(): boolean {
    try {
        return localStorage.getItem(DARK_MODE_LOCAL_STORAGE_KEY) === "true";
    } catch (e) {
        return false;
    }
}

function writeDarkmodeToLocalStorage(updatedDarkMode: boolean): void {
    try {
        localStorage.setItem(
            DARK_MODE_LOCAL_STORAGE_KEY,
            String(updatedDarkMode),
        );
    } catch (e) {
        return;
    }
}

// // // //

interface LocalStorageProviderProps {
    plugin: PluginMetadata;
    children: (childProps: {
        projectInput: ProjectInput;
        setProject: (updatedProjectInput: ProjectInput) => void;
        clearProject: () => void;
        darkMode: boolean;
        setDarkMode: (darkMode: boolean) => void;
    }) => React.ReactNode;
}

/**
 * LocalStorageProvider
 * Provides a mechanism to persisting a project to window.localStorage
 * @param props.plugin - The Codotype PluginMetadata forwhich the LocalStorageProvider is saving a ProjectInput
 */
export function LocalStorageProvider(props: LocalStorageProviderProps) {
    const [projectInput, setProjectState] = React.useState<ProjectInput>(
        readProjectFromLocalStorage({ plugin: props.plugin }),
    );
    const [darkMode, setDarkModeState] = React.useState<boolean>(
        readDarkmodeFromLocalStorage(),
    );

    React.useEffect(() => {
        // Set light-mode
        if (darkMode) {
            const htmlNode =
                document?.getElementsByTagName("html")[0] || undefined;
            if (htmlNode === undefined) {
                return;
            }
            htmlNode.setAttribute("class", "dark");
            return;
        }

        // Set light-mode
        const htmlNode = document?.getElementsByTagName("html")[0] || undefined;
        if (htmlNode === undefined) {
            return;
        }
        htmlNode.setAttribute("class", "");
    }, [darkMode]);

    function setProject(updatedProjectInput: ProjectInput) {
        setProjectState(updatedProjectInput);
        writeProjectToLocalStorage({
            plugin: props.plugin,
            project: updatedProjectInput,
        });
    }

    function clearProject() {
        clearLocalStorage({ plugin: props.plugin });
        setProjectState(buildDefaultProjectInput(props.plugin));
    }

    function setDarkMode(updatedDarkMode: boolean) {
        setDarkModeState(updatedDarkMode);
        writeDarkmodeToLocalStorage(updatedDarkMode);
    }

    return (
        <ErrorBoundary
            fallbackRender={(errorBoundaryProps: any) => {
                return <FallbackComponent {...errorBoundaryProps} />;
            }}
            onReset={() => {
                clearLocalStorage({ plugin: props.plugin });
                setProjectState(buildDefaultProjectInput(props.plugin));
            }}
        >
            <React.Fragment>
                {props.children({
                    projectInput,
                    setProject,
                    clearProject,
                    darkMode,
                    setDarkMode,
                })}
            </React.Fragment>
        </ErrorBoundary>
    );
}
