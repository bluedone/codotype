import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { PluginMetadata, ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFolderOpen } from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";
import { LoadExampleProjectModal } from "./LoadExampleProjectModal";

// // // //

const StyledDiv = styled.div`
    .dropdown-toggle.btn {
        &:after {
            display: none;
        }
    }
`;

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
        <StyledDiv>
            <Dropdown alignRight>
                <Dropdown.Toggle
                    variant="light"
                    size="lg"
                    className="mr-2"
                    id="example-projects-dropdown"
                >
                    <FontAwesomeIcon
                        icon={faFolderOpen}
                        className="text-blue-500 mr-1"
                    />
                    <span className="text-blue-500">Example Projects</span>
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header>
                        <span className="text-blue-500">Example Projects</span>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    {exampleProjects.map((projectInput: ProjectInput) => (
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedProject(projectInput);
                            }}
                        >
                            {projectInput.identifiers.title}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

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
        </StyledDiv>
    );
}
