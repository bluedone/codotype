import * as React from "react";
import { Schema } from "../types";
import classnames from "classnames";
import "./styles.scss";
import { Droppable, Draggable } from "react-beautiful-dnd";

// // // //

export function SchemaSelectorItem(props: {
    schema: Schema;
    selected: boolean;
    index: number;
    onClick: (selectedSchema: Schema) => void;
}) {
    return (
        <Draggable draggableId={props.schema.id} index={props.index}>
            {provided => (
                <li
                    className={classnames(
                        "list-group-item list-group-item-action",
                        {
                            selected: props.selected,
                        },
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.onClick(props.schema);
                    }}
                >
                    {props.schema.tokens.label}
                </li>
            )}
        </Draggable>
    );
}

export function SchemaSelector(props: {
    schemas: Schema[];
    selectedSchemaId: string;
    onChange: (selectedSchema: Schema) => void;
}) {
    return (
        <div className="card">
            <div className="card-header">Schemas</div>
            <Droppable droppableId="schema-list">
                {(provided: any) => {
                    return (
                        <ul
                            className="list-group list-group-flush"
                            ref={provided.innerRef}
                            {...provided.droppableProps}
                        >
                            {props.schemas.map((s: Schema, index: number) => {
                                return (
                                    <SchemaSelectorItem
                                        index={index}
                                        key={s.id}
                                        schema={s}
                                        selected={
                                            s.id === props.selectedSchemaId
                                        }
                                        onClick={props.onChange}
                                    />
                                );
                            })}
                            {provided.placeholder}
                        </ul>
                    );
                }}
            </Droppable>
        </div>
    );
}
