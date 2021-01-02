import * as React from "react";
import { Dropdown } from "react-bootstrap";
import { ProjectInput } from "@codotype/core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEllipsisH } from "@fortawesome/free-solid-svg-icons";
import { ResetProjectButton } from "./ResetProjectButton";
import { ProjectExportButton } from "./ProjectExportButton";
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
    projectInput: ProjectInput;
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
                    <ProjectExportButton projectInput={props.projectInput} />
                    <Dropdown.Divider />
                    <Dropdown.Header>
                        <span className="text-red-500">Danger Zone</span>
                    </Dropdown.Header>
                    <ResetProjectButton onConfirmReset={props.onConfirmReset} />
                </Dropdown.Menu>
            </Dropdown>
        </StyledDiv>
    );
}
