import * as React from "react";
import { SchemaInput } from "@codotype/core";
import classnames from "classnames";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";
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

export function SchemaSelectorItem(props: {
    schemaInput: SchemaInput;
    selected: boolean;
    index: number;
    onClick: (selectedSchema: SchemaInput) => void;
}) {
    return (
        <Draggable
            draggableId={String(props.schemaInput.id)}
            index={props.index}
        >
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
                    <div className="row items-center flex flex-row justify-between">
                        <span className="flex ml-2">
                            {props.schemaInput.identifiers.singular.title}
                        </span>

                        {/* Renders warning tooltip */}
                        {!props.schemaInput.attributes.length && (
                            <Tooltip
                                position="right"
                                tooltipContent={<>Schema requires at least one attribute</>}
                            >
                                <FontAwesomeIcon
                                    className="text-warning"
                                    icon={faExclamationCircle}
                                />
                            </Tooltip>
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
                            className="list-group rounded-none"
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
