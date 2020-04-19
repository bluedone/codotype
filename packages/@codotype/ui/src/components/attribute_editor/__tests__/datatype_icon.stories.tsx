import * as React from "react";
import { storiesOf } from "@storybook/react";
import { DatatypeIcon } from "../DatatypeIcon";
import { Story } from "@src/components/dev";
import { Datatype } from "@codotype/types";

// // // //

const testCases: [string, Datatype][] = [
    ["Datatype.STRING", Datatype.STRING],
    ["Datatype.TEXT", Datatype.TEXT],
    ["Datatype.INTEGER", Datatype.INTEGER],
    ["Datatype.BIGINT", Datatype.BIGINT],
    ["Datatype.FLOAT", Datatype.FLOAT],
    ["Datatype.DECIMAL", Datatype.DECIMAL],
    ["Datatype.NUMERIC", Datatype.NUMERIC],
    ["Datatype.BOOLEAN", Datatype.BOOLEAN],
    ["Datatype.DATE", Datatype.DATE],
    ["Datatype.TIME", Datatype.TIME],
    ["Datatype.DATETIME", Datatype.DATETIME],
    ["Datatype.TIMESTAMP", Datatype.TIMESTAMP],
    ["Datatype.BINARY", Datatype.BINARY],
    ["Datatype.JSON", Datatype.JSON],
    ["Datatype.JSONB", Datatype.JSONB],
    ["Datatype.OBJECT", Datatype.OBJECT],
    ["Datatype.STRING_ARRAY", Datatype.STRING_ARRAY],
    ["Datatype.TEXT_ARRAY", Datatype.TEXT_ARRAY],
    ["Datatype.INTEGER_ARRAY", Datatype.INTEGER_ARRAY],
    ["Datatype.BIGINT_ARRAY", Datatype.BIGINT_ARRAY],
    ["Datatype.FLOAT_ARRAY", Datatype.FLOAT_ARRAY],
    ["Datatype.DECIMAL_ARRAY", Datatype.DECIMAL_ARRAY],
    ["Datatype.NUMERIC_ARRAY", Datatype.NUMERIC_ARRAY],
    ["Datatype.BOOLEAN_ARRAY", Datatype.BOOLEAN_ARRAY],
    ["Datatype.DATE_ARRAY", Datatype.DATE_ARRAY],
    ["Datatype.TIME_ARRAY", Datatype.TIME_ARRAY],
    ["Datatype.DATETIME_ARRAY", Datatype.DATETIME_ARRAY],
    ["Datatype.TIMESTAMP_ARRAY", Datatype.TIMESTAMP_ARRAY],
    ["Datatype.SINGLE_FILE", Datatype.SINGLE_FILE],
    ["Datatype.SINGLE_IMAGE", Datatype.SINGLE_IMAGE],
];

const storyCollection = storiesOf("AttributeEditor/DatatypeIcon", module);
storyCollection.add("all variants", () => {
    return (
        <Story>
            <p>All Icons:</p>
            <div className="row">
                {testCases.map(testCase => {
                    return (
                        <div className="col-sm-4">
                            <div className="card card-body mb-3">
                                <div className="row">
                                    <div className="col-sm-9">
                                        <p className="mb-0">{testCase[0]}</p>
                                    </div>
                                    <div className="col-sm-3 d-flex justify-content-end">
                                        <DatatypeIcon datatype={testCase[1]} />
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
