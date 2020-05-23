import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { Project } from "@codotype/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { ResetProjectButton } from "./ResetProjectButton";
import styled from "styled-components";
import download from "downloadjs";

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
                            // Defines filename
                            const filename: string = `codotype-project-${
                                props.project.identifiers.snake
                            }-${Date.now()}.json`;
                            // Downloads file
                            download(
                                JSON.stringify(props.project, null, 4),
                                filename,
                                "application/json",
                            );
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
        </StyledDiv>
    );
}
