import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RelationDiagram, RelationDiagramProps } from "../RelationDiagram";
import { Story } from "../../dev";

// // // //

const testCases: [string, RelationDiagramProps][] = [
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: false,
            sourceLabel: "User",
            sourceAlias: "User",
            destPlural: false,
            destLabel: "Task",
            destAlias: "Task",
            slim: false,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: false,
            sourceLabel: "User",
            sourceAlias: "Assignee",
            destPlural: false,
            destLabel: "Task",
            destAlias: "Task",
            slim: false,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: false,
            sourceLabel: "User",
            sourceAlias: "User",
            destPlural: false,
            destLabel: "Task",
            destAlias: "Assigned Task",
            slim: false,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: true,
            sourceLabel: "Users",
            sourceAlias: "Users",
            destPlural: false,
            destLabel: "Task",
            destAlias: "Task",
            slim: false,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: false,
            sourceLabel: "User",
            sourceAlias: "User",
            destPlural: true,
            destLabel: "Task",
            destAlias: "Task",
            slim: false,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: true,
            sourceLabel: "Users",
            sourceAlias: "Users",
            destPlural: true,
            destLabel: "Task",
            destAlias: "Task",
            slim: false,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: true,
            sourceLabel: "Users",
            sourceAlias: "Assignees",
            destPlural: true,
            destLabel: "Task",
            destAlias: "Task",
            slim: true,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: true,
            sourceLabel: "Users",
            sourceAlias: "Users",
            destPlural: true,
            destLabel: "Task",
            destAlias: "Assigned Tasks",
            slim: true,
        },
    ],
    [
        "Datatypes.STRING",
        {
            direction: "out",
            sourcePlural: true,
            sourceLabel: "Users",
            sourceAlias: "Assignees",
            destPlural: true,
            destLabel: "Task",
            destAlias: "Assigned Tasks",
            slim: true,
        },
    ],
];

const storyCollection = storiesOf(
    "ProjectEditor/RelationEditor/RelationDiagram",
    module,
);
storyCollection.add("all variants", () => {
    return (
        <Story>
            <div className="row">
                {testCases.map(testCase => {
                    return (
                        <div className="col-sm-12">
                            <div className="card card-body mb-3">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <RelationDiagram {...testCase[1]} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Story>
    );
});

storyCollection.add("all in", () => {
    return (
        <Story>
            <div className="row">
                {testCases.map(testCase => {
                    return (
                        <div className="col-sm-12">
                            <div className="card card-body mb-3">
                                <div className="row">
                                    <div className="col-sm-12">
                                        <RelationDiagram
                                            {...{
                                                ...testCase[1],
                                                direction: "in",
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </Story>
    );
});
