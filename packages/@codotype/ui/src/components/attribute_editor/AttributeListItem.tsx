import * as React from "react";
import { Draggable } from "react-beautiful-dnd";
import { Dropdown } from "react-bootstrap";
import { AttributeListItemLabel } from "./AttributeListItemLabel";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { DATATYPE_META, Attribute } from "@codotype/types";
import {
    faTrashAlt,
    faPencilAlt,
    faEllipsisH,
    faLock,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// // // //

// interface AttributeListItemProps {
//     attribute: Attribute;
//     onEditButtonClick: (attributeToBeEdited: Attribute) => void;
//     onRemoveButtonClick: (attributeToBeRemoved: Attribute) => void;
// }

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
        <Draggable draggableId={String(props.attribute.id)} index={props.index}>
            {provided => (
                <StyledListItem
                    className="list-group-item list-group-item-action py-0 px-2"
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className="row d-flex align-items-center">
                        <div className="col-sm-10">
                            <AttributeListItemLabel
                                attribute={props.attribute}
                                datatype={
                                    // @ts-ignore
                                    DATATYPE_META[props.attribute.datatype]
                                }
                            />
                        </div>

                        {props.attribute.locked && (
                            <div
                                className="col-sm-2 text-right controls justify-content-end"
                                v-if="item.locked"
                            >
                                <span
                                    className=" badge badge-secondary"
                                    // v-b-tooltip.hover.right
                                    title="Attribute may not be edited or removed"
                                >
                                    {/* <i className="fa fa-fw fa-lock" /> */}
                                    <FontAwesomeIcon icon={faLock} />
                                </span>
                            </div>
                        )}

                        {!props.attribute.locked && (
                            <div className="col-sm-2 text-right controls">
                                <Dropdown alignRight>
                                    <Dropdown.Toggle
                                        variant="light"
                                        size="sm"
                                        className="rounded px-0 py-0 d-flex"
                                        id={`attribute-${props.attribute.id}-list-item`}
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
                        )}
                    </div>
                </StyledListItem>
            )}
        </Draggable>
    );
}
