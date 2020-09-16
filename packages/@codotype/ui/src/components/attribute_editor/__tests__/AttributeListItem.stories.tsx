import * as React from "react";
import { storiesOf } from "@storybook/react";
import { Story } from "../../dev";
import { Attribute } from "@codotype/core";
import { Droppable, DragDropContext } from "react-beautiful-dnd";
import { AttributeListItem } from "../AttributeListItem";
import { attributeExample01, attributeExample02 } from "./test_state";

// // // //

const testCases: [string, Attribute][] = [
    ["Name", attributeExample01],
    ["Email", attributeExample02],
];

const storyCollection = storiesOf(
    "ProjectEditor/AttributeEditor/AttributeListItem",
    module,
);

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
                    <Droppable droppableId="attribute-list">
                        {(provided: any) => {
                            return (
                                <ul
                                    className="list-group list-group-flush"
                                    ref={provided.innerRef}
                                    {...provided.droppableProps}
                                >
                                    <AttributeListItem
                                        attribute={testCase[1]}
                                        index={0}
                                        onClickEdit={(
                                            attributeToBeEdited: Attribute,
                                        ) => {
                                            console.log("onClickEdit");
                                            console.log(attributeToBeEdited);
                                        }}
                                        onClickDelete={(
                                            attributeToBeDelete: Attribute,
                                        ) => {
                                            console.log("onClickDelete");
                                            console.log(attributeToBeDelete);
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
