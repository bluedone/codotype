import * as React from "react";
import { SchemaForm } from "../schema_form";
import { defaultSchema } from "../schema_editor/reducer"

// // // //

/**
 * ProjectEmptyState
 * @param props
 */
export function ProjectEmptyState() {
  return (
    <div className="card card-body">
      <div className='row align-items-center justify-content-center'>
        <div className="col-lg-12">
          <SchemaForm
            schema={defaultSchema}
            onCancel={() => console.log('cancel')}
            onSubmit={() => console.log('submit')}
          />
        </div>
      </div>
      <div className="col-lg-12 text-right">
        <button
          className="btn btn-primary"
        >
          Create Schema
        </button>
      </div>
    </div>
  );
}
