import * as React from "react";
import { GeneratorMeta, Project } from "@codotype/types";
import { dummyGeneratorMeta } from "../../components/project_editor/__tests__/test_state";
import { buildDefaultProject } from "@codotype/util";

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

function clearLocalSorage(props: { generator: GeneratorMeta }) {
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

interface WebRuntimeProps {
    generator: GeneratorMeta;
    children: (childProps: {
        generator: GeneratorMeta;
        project: Project;
        setProject: (updatedProject: Project) => void;
        clearProject: () => void;
    }) => React.ReactNode;
}

/**
 * WebRuntime
 * @param props - see `WebRuntimeProps`
 */
export function WebRuntime(props: WebRuntimeProps) {
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
        clearLocalSorage({ generator: props.generator });
        setProjectState(buildDefaultProject(props.generator));
    }

    return (
        <React.Fragment>
            {props.children({
                generator: props.generator,
                project,
                setProject,
                clearProject,
            })}
        </React.Fragment>
    );
}
