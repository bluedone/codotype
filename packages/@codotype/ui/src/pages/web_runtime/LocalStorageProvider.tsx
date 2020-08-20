import * as React from "react";
import { GeneratorMeta, Project, buildDefaultProject } from "@codotype/core";
import { ErrorBoundary } from "react-error-boundary";
import { FallbackComponent } from "./ErrorBoundary";

// // // //

function getLocalStorageKey(generator: GeneratorMeta): string {
    return `${generator.id}-${generator.version}`;
}

function writeProjectToLocalStorage(props: {
    project: Project;
    generator: GeneratorMeta;
}) {
    localStorage.setItem(
        getLocalStorageKey(props.generator),
        JSON.stringify(props.project),
    );
}

function clearLocalStorage(props: { generator: GeneratorMeta }) {
    localStorage.removeItem(getLocalStorageKey(props.generator));
}

function readProjectFromLocalStorage(props: {
    generator: GeneratorMeta;
}): Project {
    try {
        const localStorageKey = getLocalStorageKey(props.generator);
        // @ts-ignore
        const localStorageValue: string = localStorage.getItem(localStorageKey);
        if (!localStorageValue) {
            return buildDefaultProject(props.generator);
        }
        const parsedProject: Project = JSON.parse(localStorageValue);
        return parsedProject;
    } catch (e) {
        return buildDefaultProject(props.generator);
    }
}

// // // //

interface LocalStorageProviderProps {
    generator: GeneratorMeta;
    children: (childProps: {
        project: Project;
        setProject: (updatedProject: Project) => void;
        clearProject: () => void;
    }) => React.ReactNode;
}

/**
 * LocalStorageProvider
 * Provides a mechanism to persisting a project to window.localStorage
 * @param props - see `LocalStorageProviderProps`
 */
export function LocalStorageProvider(props: LocalStorageProviderProps) {
    const [project, setProjectState] = React.useState<Project>(
        readProjectFromLocalStorage({ generator: props.generator }),
    );

    function setProject(updatedProject: Project) {
        setProjectState(updatedProject);
        writeProjectToLocalStorage({
            generator: props.generator,
            project: updatedProject,
        });
    }

    function clearProject() {
        clearLocalStorage({ generator: props.generator });
        setProjectState(buildDefaultProject(props.generator));
    }

    return (
        <ErrorBoundary
            fallbackRender={(errorBoundaryProps: any) => {
                return <FallbackComponent {...errorBoundaryProps} />;
            }}
            onReset={() => {
                clearLocalStorage({ generator: props.generator });
                setProjectState(buildDefaultProject(props.generator));
            }}
        >
            <React.Fragment>
                {props.children({
                    project,
                    setProject,
                    clearProject,
                })}
            </React.Fragment>
        </ErrorBoundary>
    );
}
