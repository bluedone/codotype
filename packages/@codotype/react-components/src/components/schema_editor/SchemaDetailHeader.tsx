import * as React from "react";
import { SchemaEditButton } from "./SchemaEditButton";
import { SchemaDeleteButton } from "./SchemaDeleteButton";
import { Schema } from "../types";

// // // //

export function SchemaDetailHeader(props: { schema: Schema }) {
    return (
        <div className="row">
            <div className="col-lg-10">
                <h4 className="mb-0">
                    {props.schema.tokens.label} Schema
                    <SchemaEditButton />
                </h4>
            </div>
            <div className="col-lg-2 d-flex justify-content-end">
                <SchemaDeleteButton />
            </div>
            <div className="col-lg-12">
                <hr />
            </div>
        </div>
    );
}
