import * as React from "react";
import { OverlayTrigger, Tooltip } from "react-bootstrap";
import {
    Relation,
    AddonPropertyInlineIcons,
    SchemaInput,
    RelationAddon,
    PropertyTypes,
} from "@codotype/core";
import { Draggable } from "react-beautiful-dnd";
import { RelationBadge } from "./RelationBadge";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { IconDefinition } from "@fortawesome/fontawesome-common-types";
import {
    faTrashAlt,
    faSnowflake,
    faAsterisk,
    faStar,
    faTag,
    faCheck,
} from "@fortawesome/free-solid-svg-icons";
import styled from "styled-components";

// // // //

// Maps AddonPropertyInlineIcon to associated FontAwesome IconDefinition
const mapAddonIconToFontAwesome: {
    [key in AddonPropertyInlineIcons]: IconDefinition | null;
} = {
    [AddonPropertyInlineIcons.none]: null,
    [AddonPropertyInlineIcons.snowflake]: faSnowflake,
    [AddonPropertyInlineIcons.asterisk]: faAsterisk,
    [AddonPropertyInlineIcons.star]: faStar,
    [AddonPropertyInlineIcons.tag]: faTag,
    [AddonPropertyInlineIcons.check]: faCheck,
};

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
    addons: RelationAddon[];
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
                    <div className="row flex items-center">
                        <div className="col-sm-10">
                            <RelationBadge
                                slim
                                direction="out"
                                relation={relation}
                            />
                            {/* Render Addon badges */}
                            {props.addons
                                .filter(
                                    a =>
                                        relation.type !== null &&
                                        a.supportedRelationTypes.includes(
                                            relation.type,
                                        ),
                                )
                                .map(addon => {
                                    const icon =
                                        mapAddonIconToFontAwesome[
                                        addon.property.inlineIcon
                                        ];
                                    if (icon === null) {
                                        return null;
                                    }

                                    if (
                                        relation.addons[
                                        addon.property.identifier
                                        ] === undefined
                                    ) {
                                        return null;
                                    }

                                    // Return null for boolean addon with falsey property
                                    if (
                                        addon.property.propertyType ===
                                        PropertyTypes.BOOLEAN &&
                                        relation.addons[
                                        addon.property.identifier
                                        ] === false
                                    ) {
                                        return null;
                                    }

                                    return (
                                        <OverlayTrigger
                                            placement="right"
                                            overlay={
                                                <Tooltip
                                                    id={`badge-${relation.id}-${addon.property.identifier}`}
                                                >
                                                    {
                                                        addon.property.content
                                                            .label
                                                    }
                                                </Tooltip>
                                            }
                                        >
                                            <span className="ml-2 badge bg-gray-300">
                                                <FontAwesomeIcon icon={icon} />
                                            </span>
                                        </OverlayTrigger>
                                    );
                                })}
                        </div>
                        <div className="col-sm-2 text-right flex controls justify-end">
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
