import * as React from "react";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import classnames from "classnames";
import { LoadExampleProjectModal } from "./LoadExampleProjectModal";
import { Menu, Transition } from "@headlessui/react";

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
            <Menu
                as="div"
                className="relative inline-block text-left z-10 mr-4"
            >
                {({ open }) => (
                    <>
                        <div>
                            <Menu.Button className="whitespace-nowrap inline-flex items-center justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-3 bg-white dark:bg-gray-900 dark:text-gray-200 dark:border-gray-800 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-100 focus:ring-indigo-500">
                                <FontAwesomeIcon
                                    icon={faFolderOpen}
                                    className="mr-2"
                                />
                                Example Projects
                            </Menu.Button>
                        </div>

                        <Transition
                            show={open}
                            // as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items
                                static
                                className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white dark:bg-gray-900 ring-1 ring-black ring-opacity-5 focus:outline-none"
                            >
                                <div className="py-1">
                                    {exampleProjects.map(projectInput => {
                                        return (
                                            <Menu.Item>
                                                {({ active }) => (
                                                    <button
                                                        className={classnames(
                                                            "block w-full text-left px-4 py-2 text-sm",
                                                            {
                                                                "bg-gray-100 dark:bg-gray-800 dark:text-gray-200 text-gray-900": active,
                                                                "text-gray-700 dark:text-gray-200": !active,
                                                            },
                                                        )}
                                                        onClick={() => {
                                                            setSelectedProject(
                                                                projectInput,
                                                            );
                                                        }}
                                                    >
                                                        {
                                                            projectInput
                                                                .identifiers
                                                                .title
                                                        }
                                                    </button>
                                                )}
                                            </Menu.Item>
                                        );
                                    })}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </>
                )}
            </Menu>

            {/* Render LoadExampleProjectModal */}
            <LoadExampleProjectModal
                show={selectedProject !== null}
                onHide={() => {
                    setSelectedProject(null);
                }}
                onConfirm={() => {
                    if (selectedProject !== null) {
                        props.loadExampleProject(selectedProject);
                    }
                    setSelectedProject(null);
                }}
            />
        </React.Fragment>
    );
}
