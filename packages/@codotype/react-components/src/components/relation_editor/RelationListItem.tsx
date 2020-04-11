import * as React from "react";
import { Relation, Schema } from "@codotype/types";
import { Draggable } from "react-beautiful-dnd";
import { Dropdown } from "react-bootstrap";
import { RelationBadge } from "./RelationBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faPencilAlt,
    faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

// // // //

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
    onClickEdit: (relationToBeEdited: Relation) => void;
    onClickDelete: (relationToDelete: Relation) => void;
}) {
    const { relation, selectedSchema } = props;
    return (
        <Draggable draggableId={String(relation.id)} index={props.index}>
            {provided => (
                <li
                    className="list-group-item list-group-item-action sortable py-0 px-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-10">
                            <small>
                                <RelationBadge
                                    slim
                                    direction="out"
                                    relation={relation}
                                    schemas={[]}
                                    selectedSchema={selectedSchema}
                                />
                            </small>
                        </div>
                        <div className="col-sm-2 text-right d-flex controls justify-content-end">
                            <Dropdown alignRight className="no-caret">
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    size={"sm"}
                                    className="px-0 py-0"
                                    id="dropdown-basic"
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
                </li>
            )}
        </Draggable>
    );
}
