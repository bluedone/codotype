import * as React from "react";
import { Relation, Schema } from "@codotype/core";
import { Draggable } from "react-beautiful-dnd";
import { Dropdown } from "react-bootstrap";
import { RelationBadge } from "./RelationBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faPencilAlt,
    faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// // // //

// padding: 0.25rem 0.5rem
const StyledListItem = styled.li`
    cursor: grab;
    border-left: 3px solid #adb5bd !important;

    &:hover {
        .controls {
            opacity: 1;
        }
    }

    .controls {
        transition: opacity 0.25s ease-in;
        opacity: 0;
        .dropdown-toggle.btn.btn-sm {
            &:after {
                display: none;
            }
        }
    }
`;

/**
 * RelationListItem
 * @param props.relation
 * @param props.index
 * @param onClickEdit
 * @param onClickDelete
 */
export function RelationListItem(props: {
    relation: Relation;
    index: number;
    selectedSchema: Schema;
    schemas: Schema[];
    onClickEdit: (relationToBeEdited: Relation) => void;
    onClickDelete: (relationToDelete: Relation) => void;
}) {
    const { relation } = props;
    return (
        <Draggable draggableId={String(relation.id)} index={props.index}>
            {provided => (
                <StyledListItem
                    className="list-group-item list-group-item-action py-0 px-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-10">
                            <RelationBadge
                                slim
                                direction="out"
                                relation={relation}
                            />
                        </div>
                        <div className="col-sm-2 text-right d-flex controls justify-content-end">
                            <Dropdown alignRight className="no-caret">
                                <Dropdown.Toggle
                                    variant="light"
                                    size="sm"
                                    className="rounded px-0 py-0 d-flex"
                                    id={`relation-${props.relation.id}-list-item`}
                                >
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            props.onClickEdit(relation);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faPencilAlt}
                                        />
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item
                                        onClick={() => {
                                            props.onClickDelete(relation);
                                        }}
                                    >
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faTrashAlt}
                                        />
                                        Delete
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </div>
                    </div>
                </StyledListItem>
            )}
        </Draggable>
    );
}
