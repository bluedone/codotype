import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { PluginMetadata, Project } from "@codotype/core";
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
    loadExampleProject: (exampleProject: Project) => void;
}) {
    const { exampleProjects = [] } = props.plugin;
    const [
        selectedProject,
        setSelectedProject,
    ] = React.useState<Project | null>(null);

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
                        className="text-primary"
                    />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    <Dropdown.Header>
                        <span className="text-primary">Example Projects</span>
                    </Dropdown.Header>
                    <Dropdown.Divider />
                    {exampleProjects.map((project: Project) => (
                        <Dropdown.Item
                            onClick={() => {
                                setSelectedProject(project);
                            }}
                        >
                            {project.identifiers.label}
                        </Dropdown.Item>
                    ))}
                </Dropdown.Menu>
            </Dropdown>

            {selectedProject && (
                <LoadExampleProjectModal
                    project={selectedProject}
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
