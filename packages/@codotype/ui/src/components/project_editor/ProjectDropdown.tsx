import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { Project } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { ResetProjectButton } from "./ResetProjectButton";
import { ProjectExportModal } from "./ProjectExportModal";
import styled from "styled-components";

// // // //

const StyledDiv = styled.div`
    .dropdown-toggle.btn {
        &:after {
            display: none;
        }
    }
`;

export function ProjectDropdown(props: {
    project: Project;
    onConfirmReset: () => void;
}) {
    const [showingExportModal, showExportModal] = React.useState<boolean>(
        false,
    );
    return (
        <StyledDiv>
            <Dropdown alignRight>
                <Dropdown.Toggle
                    variant="light"
                    size="lg"
                    className="mr-2"
                    id="project-editor-dropdown"
                >
                    <FontAwesomeIcon icon={faEllipsisH} />
                </Dropdown.Toggle>

                <Dropdown.Menu>
                    {/* <Dropdown.Item>Import Project</Dropdown.Item> */}
                    {/* <Dropdown.Divider /> */}
                    {/* <Dropdown.Header>Download Schemas</Dropdown.Header> */}
                    {/* <Dropdown.Item>GraphQL</Dropdown.Item> */}
                    {/* <Dropdown.Item>TypeScript</Dropdown.Item> */}
                    {/* <Dropdown.Item>JSON</Dropdown.Item> */}
                    <Dropdown.Item
                        onClick={() => {
                            showExportModal(true);
                        }}
                    >
                        Export Project
                    </Dropdown.Item>
                    <Dropdown.Divider />
                    <Dropdown.Header>
                        <span className="text-danger">Danger Zone</span>
                    </Dropdown.Header>
                    <ResetProjectButton onConfirmReset={props.onConfirmReset} />
                </Dropdown.Menu>
            </Dropdown>

            <ProjectExportModal
                project={props.project}
                show={showingExportModal}
                onHide={() => {
                    showExportModal(false);
                }}
            />
        </StyledDiv>
    );
}
