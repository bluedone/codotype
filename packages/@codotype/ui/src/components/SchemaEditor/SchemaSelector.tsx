import * as React from "react";
import { SchemaInput } from "@codotype/core";
import classnames from "classnames";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import styled from "styled-components";

// // // //

const StyledListItem = styled.li`
    cursor: pointer;
    border-left: 6px solid #adb5bd !important;

    &.selected {
        border-left: 6px solid #4582ec !important;
        font-weight: bold;
    }
`;

// ALT STYLE
// const StyledListItem = styled.li`
//     cursor: pointer;
//     border-right: 6px solid #adb5bd !important;
//     &.selected {
//         border-right: 6px solid #4582ec !important;
//         font-weight: bold;
//     }
// `;

export function SchemaSelectorItem(props: {
    schemaInput: SchemaInput;
    selected: boolean;
    index: number;
    onClick: (selectedSchema: SchemaInput) => void;
}) {
    return (
        <Draggable draggableId={String(props.schemaInput.id)} index={props.index}>
            {provided => (
                <StyledListItem
                    className={classnames(
                        "list-group-item list-group-item-action",
                        {
                            selected: props.selected,
                            "text-muted": !props.selected,
                        },
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.onClick(props.schemaInput);
                    }}
                >
                    <div className="row align-items-center d-flex flex-row justify-content-between">
                        <span className="d-flex ml-2">
                            {props.schemaInput.identifiers.singular.title}
                        </span>

                        {/* Renders warning tooltip */}
                        {/* TODO - update this to check relations */}
                        {/* !props.projectInput.relations.length &&  */}
                        {!props.schemaInput.attributes.length && (
                            <OverlayTrigger
                                placement="right"
                                overlay={
                                    <Tooltip
                                        id={`empty-schema-warning-tooltip-${props.schemaInput.id}`}
                                    >
                                        Schema requires at least one attribute
                                        or relation - empty schemas will be
                                        ignored
                                    </Tooltip>
                                }
                            >
                                <FontAwesomeIcon
                                    className="mr-1 text-warning"
                                    icon={faExclamationCircle}
                                />
                            </OverlayTrigger>
                        )}
                    </div>
                </StyledListItem>
            )}
        </Draggable>
    );
}

export function SchemaSelector(props: {
    schemaInputs: SchemaInput[];
    selectedSchemaId: string;
    onChange: (selectedSchema: SchemaInput) => void;
}) {
    return (
        <div className="card shadow-sm">
            <Droppable droppableId="schema-list">
                {(provided: any) => {
                    return (
                        <ul
                            className="list-group list-group-flush"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.schemaInputs.map(
                                (s: SchemaInput, index: number) => {
                                    return (
                                        <SchemaSelectorItem
                                            index={index}
                                            key={s.id}
                                            schemaInput={s}
                                            selected={
                                                s.id === props.selectedSchemaId
                                            }
                                            onClick={props.onChange}
                                        />
                                    );
                                },
                            )}
                            {provided.placeholder}
                        </ul>
                    );
                }}
            </Droppable>
        </div>
    );
}
