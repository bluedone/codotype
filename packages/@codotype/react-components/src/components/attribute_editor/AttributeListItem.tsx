import * as React from "react";
import { Attribute } from "../types";
import { Draggable } from "react-beautiful-dnd";
import { Dropdown } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faTrashAlt,
    faPencilAlt,
    faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

// // // //

/**
 * AttributeListItem
 * @param props.attribute
 * @param props.index
 * @param onClickEdit
 * @param onClickDelete
 */
export function AttributeListItem(props: {
    attribute: Attribute;
    index: number;
    onClickEdit: (attributeToBeEdited: Attribute) => void;
    onClickDelete: (attributeToDelete: Attribute) => void;
}) {
    const { attribute } = props;
    return (
        <Draggable draggableId={props.attribute.id} index={props.index}>
            {provided => (
                <li
                    className="list-group-item"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="row">
                        <div className="col-lg-9">{attribute.label}</div>
                        <div className="col-lg-3 d-flex justify-content-end">
                            <Dropdown alignRight className="no-caret">
                                <Dropdown.Toggle
                                    variant="outline-secondary"
                                    size={"sm"}
                                    id="dropdown-basic"
                                >
                                    <FontAwesomeIcon icon={faEllipsisH} />
                                </Dropdown.Toggle>

                                <Dropdown.Menu>
                                    <Dropdown.Item
                                        onClick={() => {
                                            props.onClickEdit(attribute);
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
                                            props.onClickDelete(attribute);
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
