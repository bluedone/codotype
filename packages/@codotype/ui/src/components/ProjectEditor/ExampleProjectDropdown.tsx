import * as React from "react";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import { LoadExampleProjectModal } from "./LoadExampleProjectModal";
import { Dropdown } from "../Dropdown";

// // // //

export function ExampleProjectDropdown(props: {
    plugin: PluginMetadata;
    loadExampleProject: (exampleProjectInput: ProjectInput) => void;
}) {
    const { exampleProjects = [] } = props.plugin;
    const [
        selectedProject,
        setSelectedProject,
    ] = React.useState<ProjectInput | null>(null);

    // Return null if there are no projects
    if (exampleProjects.length === 0) {
        return null;
    }

    return (
        <React.Fragment>
            <Dropdown label={
                <span className="text-blue-500 whitespace-no-wrap">
                    <FontAwesomeIcon
                        icon={faFolderOpen}
                        className="mr-1"
                    />
                Example Projects
                </span>
            }
                itemCount={exampleProjects.length} >
                {({ i }) => {
                    const projectInput = exampleProjects[i];
                    if (!projectInput) {
                        return null;
                    }

                    return (
                        <button
                            className="bg-white text-gray-700 hover:bg-gray-100 hover:text-gray-900 flex justify-between w-full px-4 py-3 leading-5 text-left text-base"
                            onClick={() => {
                                setSelectedProject(projectInput);
                            }}
                        >
                            {projectInput.identifiers.title}
                        </button>
                    )
                }}
            </Dropdown>

            {/* Render LoadExampleProjectModal */}
            {selectedProject && (
                <LoadExampleProjectModal
                    projectInput={selectedProject}
                    show={selectedProject !== null}
                    onHide={() => {
                        setSelectedProject(null);
                    }}
                    onConfirm={() => {
                        props.loadExampleProject(selectedProject);
                        setSelectedProject(null);
                    }}
                />
            )}
        </React.Fragment>
    )

}
