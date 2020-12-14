import * as React from "react";
import { Relation, SchemaInput } from "@codotype/core";
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
    selectedSchema: SchemaInput;
    schemas: SchemaInput[];
    onClickEdit: (relationToBeEdited: Relation) => void;
    onClickDelete: (relationToDelete: Relation) => void;
}) {
    const { relation } = props;
    return (
        <Draggable draggableId={String(relation.id)} index={props.index}>
            {provided => (
                <StyledListItem
                    className="list-group-item list-group-item-action py-1 px-2"
                    ref={provided.innerRef}
                    onClick={() => {
                        // Don't allow editing if Attribute.locked is true
                        if (relation.locked) {
                            return;
                        }
                        props.onClickEdit(relation);
                    }}
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
                            <button
                                className="btn btn-sm btn-outline-danger px-0 py-0"
                                onClick={e => {
                                    e.stopPropagation();
                                    e.preventDefault();
                                    props.onClickDelete(relation);
                                }}
                            >
                                <FontAwesomeIcon
                                    className="mx-2"
                                    icon={faTrashAlt}
                                />
                            </button>
                        </div>
                    </div>
                </StyledListItem>
            )}
        </Draggable>
    );
}
