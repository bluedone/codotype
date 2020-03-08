import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import { Attribute, Datatype } from "../types";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { AttributeFormModal } from "./AttributeFormModal";
import { AttributeDeleteModal } from "./AttributeDeleteModal";
import { AttributeListItem } from "./AttributeListItem";
import { AttributeForm } from "./AttributeForm";

// // // //

// TODO - abstract this
function reorder<T>(list: T[], startIndex: number, endIndex: number): T[] {
    const result = Array.from(list);
    const [removed] = result.splice(startIndex, 1);
    result.splice(endIndex, 0, removed);
    return result;
}

// // // //

// TODO - add props.onChange here
export function AttributeEditor(props: { attributes: Attribute[] }) {
    const [state, setState] = React.useState({ attributes: props.attributes });
    const [showingFormModal, showFormModal] = React.useState(false);
    const [showingDeleteModal, showDeleteModal] = React.useState(false);

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
            <SortableListHeader
                label="Attributes"
                onClick={() => {
                    showFormModal(true);
                }}
            />

            <AttributeFormModal
                show={showingFormModal}
                handleClose={() => {
                    showFormModal(false);
                }}
            >
                <AttributeForm
                    attributes={state.attributes}
                    editorModel={{
                        ...state.attributes[0],
                        datatype: null,
                    }}
                    supportedDatatypes={[Datatype.STRING, Datatype.INTEGER]}
                    onSubmit={() => {
                        console.log("OnSubmit");
                    }}
                    onCancel={() => {
                        showFormModal(false);
                    }}
                />
            </AttributeFormModal>

            <AttributeDeleteModal
                show={showingDeleteModal}
                onClose={() => showDeleteModal(false)}
                onConfirm={() => {
                    showDeleteModal(false);
                }}
            />

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
                                                onClickEdit={() => {
                                                    showFormModal(true);
                                                }}
                                                onClickDelete={() => {
                                                    showDeleteModal(true);
                                                }}
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
