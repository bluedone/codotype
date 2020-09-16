// import * as React from "react";
// import { storiesOf } from "@storybook/react";
// import { Relation, RelationReference } from "@codotype/core";
// import { Droppable, DragDropContext } from "react-beautiful-dnd";
// import { RelationListItem } from "../RelationListItem";
// import { relationExample01, relationExample02, userSchema } from "./test_state";

// // // // //

// const testCases: [string, RelationReference][] = [
//     ["Name", relationExample01],
//     ["Email", relationExample02],
// ];

// const storyCollection = storiesOf("ProjectEditor/RelationEditor/RelationListItem", module);

// testCases.forEach(testCase => {
//     storyCollection.add(testCase[0], () => {
//         return (
//             <Story>
//                 <DragDropContext
//                     onDragEnd={result => {
//                         if (!result.destination) {
//                             return;
//                         }

//                         if (result.destination.index === result.source.index) {
//                             return;
//                         }
//                     }}
//                 >
//                     <Droppable droppableId="relation-list">
//                         {(provided: any) => {
//                             return (
//                                 <ul
//                                     className="list-group list-group-flush"
//                                     ref={provided.innerRef}
//                                     {...provided.droppableProps}
//                                 >
//                                     <RelationListItem
//                                         selectedSchema={userSchema}
//                                         relation={testCase[1]}
//                                         index={0}
//                                         onClickEdit={(
//                                             relationToBeEdited: Relation,
//                                         ) => {
//                                             console.log("onClickEdit");
//                                             console.log(relationToBeEdited);
//                                         }}
//                                         onClickDelete={(
//                                             relationToBeDelete: Relation,
//                                         ) => {
//                                             console.log("onClickDelete");
//                                             console.log(relationToBeDelete);
//                                         }}
//                                     />
//                                     {provided.placeholder}
//                                 </ul>
//                             );
//                         }}
//                     </Droppable>
//                 </DragDropContext>
//             </Story>
//         );
//     });
// });
