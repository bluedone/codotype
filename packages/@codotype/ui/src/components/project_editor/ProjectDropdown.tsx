import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { ResetProjectButton } from "./ResetProjectButton";
import styled from "styled-components";

// // // //

const StyledDiv = styled.div`
    .dropdown-toggle.btn {
        &:after {
            display: none;
        }
    }
`;

export function ProjectDropdown(props: { onConfirmReset: () => void }) {
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
                    {/* <Dropdown.Item>Export Project</Dropdown.Item> */}
                    {/* <Dropdown.Item>Import Project</Dropdown.Item> */}
                    {/* <Dropdown.Divider /> */}
                    {/* <Dropdown.Header>Download Schemas</Dropdown.Header> */}
                    {/* <Dropdown.Item>GraphQL</Dropdown.Item> */}
                    {/* <Dropdown.Item>TypeScript</Dropdown.Item> */}
                    {/* <Dropdown.Item>JSON</Dropdown.Item> */}
                    {/* <Dropdown.Divider /> */}
                    {/* <Dropdown.Header>Danger Zone</Dropdown.Header> */}
                    <ResetProjectButton onConfirmReset={props.onConfirmReset} />
                </Dropdown.Menu>
            </Dropdown>
        </StyledDiv>
    );
}
