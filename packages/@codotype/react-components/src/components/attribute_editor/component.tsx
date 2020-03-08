import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import { Attribute } from "../types";
import { Droppable, Draggable, DragDropContext } from "react-beautiful-dnd";
import { Dropdown } from "react-bootstrap";
import { AttributeFormModal } from "./AttributeFormModal";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import "./styles.scss";
import {
    faTrashAlt,
    faPencilAlt,
    faEllipsisH,
} from "@fortawesome/free-solid-svg-icons";

// // // //

// TODO - abstract this
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

// // // //

export function AttributeListItem(props: {
    attribute: Attribute;
    index: number;
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
                                    <Dropdown.Item>
                                        <FontAwesomeIcon
                                            className="mr-2"
                                            icon={faPencilAlt}
                                        />
                                        Edit
                                    </Dropdown.Item>
                                    <Dropdown.Item>
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

// // // //

// TODO - add props.onChange here
export function AttributeEditor(props: { attributes: Attribute[] }) {
    const [state, setState] = React.useState({ attributes: props.attributes });
    const [show, setShow] = React.useState(false);

    // // // //
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    // Sets state.attributes when props.attributes changes
    React.useEffect(() => {
        setState({ attributes: props.attributes });
    }, [props.attributes]);

    // TODO - can this be abstracted?
    function onDragEnd(result: any) {
        if (!result.destination) {
            return;
        }

        if (result.destination.index === result.source.index) {
            return;
        }

        const updatedAttributes = reorder<Attribute>(
            state.attributes,
            result.source.index,
            result.destination.index,
        );

        setState({ attributes: updatedAttributes });
    }

    // Render empty state
    if (state.attributes.length === 0) {
        return <div className="card card-body">No attributes defined</div>;
    }

    // Render list
    return (
        <div className="card">
            <SortableListHeader label="Attributes" onClick={handleShow} />

            <AttributeFormModal show={show} handleClose={handleClose}>
                <p>Attribute Form Goes Here</p>
            </AttributeFormModal>

            <DragDropContext onDragEnd={onDragEnd}>
                <Droppable droppableId="attribute-list">
                    {(provided: any) => {
                        return (
                            <ul
                                className="list-group list-group-flush"
                                ref={provided.innerRef}
                                {...provided.droppableProps}
                            >
                                {state.attributes.map(
                                    (a: Attribute, index: number) => {
                                        return (
                                            <AttributeListItem
                                                key={a.id}
                                                attribute={a}
                                                index={index}
                                            />
                                        );
                                    },
                                )}
                                {provided.placeholder}
                            </ul>
                        );
                    }}
                </Droppable>
            </DragDropContext>
        </div>
    );
}
