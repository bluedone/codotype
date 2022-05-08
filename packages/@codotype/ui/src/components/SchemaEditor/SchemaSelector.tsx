import * as React from "react";
import { SchemaInput } from "@codotype/core";
import classnames from "classnames";
import { Droppable, Draggable } from "react-beautiful-dnd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationCircle } from "@fortawesome/free-solid-svg-icons";
import { Tooltip } from "../Tooltip";

// // // //

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
            {(provided, snapshot) => (
                <li
                    className={classnames(
                        "cursor-pointer bg-white dark:bg-gray-900 dark:text-gray-200 select-none hover:bg-gray-100",
                        {
                            "text-primary-500 font-semibold": props.selected,
                            "text-gray-600 font-light": !props.selected,
                            "rounded-lg": snapshot.isDragging,
                        },
                    )}
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    onClick={() => {
                        props.onClick(props.schemaInput);
                    }}
                >
                    <div
                        className={classnames(
                            "row items-center flex flex-row justify-between border-l-8 py-4 px-4",
                            {
                                "border-primary-500": props.selected,
                                "border-gray-200": !props.selected,
                                "rounded-lg": snapshot.isDragging,
                            },
                        )}
                    >
                        <span className="flex">
                            {props.schemaInput.identifiers.singular.title}
                        </span>

                        {/* Renders warning tooltip */}
                        {!props.schemaInput.attributes.length && (
                            <Tooltip
                                position="right"
                                tooltipContent={
                                    <p>
                                        Data Model requires at least one
                                        attribute
                                    </p>
                                }
                            >
                                <FontAwesomeIcon
                                    className="text-yellow-400"
                                    icon={faExclamationCircle}
                                />
                            </Tooltip>
                        )}
                    </div>
                </li>
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
        <div className="shadow rounded-2xl overflow-hidden border dark:border-gray-800">
            <Droppable droppableId="schema-list">
                {(provided: any) => {
                    return (
                        <ul
                            className="list-group rounded-none divide-y divide-gray-100 dark:divide-gray-800"
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
