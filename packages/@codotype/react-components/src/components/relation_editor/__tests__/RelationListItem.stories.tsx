import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "@src/components/dev";
import { Attribute } from "../@codotype/types";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { RelationListItem } from "../RelationListItem";
import { relationExample01, relationExample02, userSchema } from "./test_state";

// // // //

const testCases: [string, Attribute][] = [
    ["Name", relationExample01],
    ["Email", relationExample02],
];

const storyCollection = storiesOf("RelationEditor/RelationListItem", module);

testCases.forEach(testCase => {
    storyCollection.add(testCase[0], () => {
        return (
            <Story>
                <DragDropContext
                    onDragEnd={result => {
                        if (!result.destination) {
                            return;
                        }

                        if (result.destination.index === result.source.index) {
                            return;
                        }
                    }}
                >
                    <Droppable droppableId="relation-list">
                        {(provided: any) => {
                            return (
                                <ul
                                    className="list-group list-group-flush"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <RelationListItem
                                        selectedSchema={userSchema}
                                        relation={testCase[1]}
                                        index={0}
                                        onClickEdit={(
                                            relationToBeEdited: Attribute,
                                        ) => {
                                            console.log("onClickEdit");
                                            console.log(relationToBeEdited);
                                        }}
                                        onClickDelete={(
                                            relationToBeDelete: Attribute,
                                        ) => {
                                            console.log("onClickDelete");
                                            console.log(relationToBeDelete);
                                        }}
                                    />
                                    {provided.placeholder}
                                </ul>
                            );
                        }}
                    </Droppable>
                </DragDropContext>
            </Story>
        );
    });
});
