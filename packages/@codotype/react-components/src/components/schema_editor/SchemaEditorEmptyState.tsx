import * as React from "react";
// import { defaultSchema } from "../schema_editor/reducer"

// // // //

/**
 * SchemaEditorEmptyState
 * @param props
 */
export function SchemaEditorEmptyState() {
    return (
        <div className="card card-body">
            <div className="row align-items-center justify-content-center">
                <div className="col-lg-12">
                    {/* <SchemaForm
                      schema={defaultSchema}
                      onCancel={() => console.log('cancel')}
                      onSubmit={() => console.log('submit')}
                    /> */}
                    <p>SCHEMA FORM GOES HERE</p>
                </div>
            </div>
            <div className="col-lg-12 text-right">
                <button className="btn btn-primary">Create Schema</button>
            </div>
        </div>
    );
}
