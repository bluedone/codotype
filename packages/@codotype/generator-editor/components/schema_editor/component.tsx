import { SchemaEditorState, schemaEditorReducer, getInitialState, defaultSchema } from "./reducer";
import * as React from "react";
import { Dispatch } from "react";
import { SchemaEditorAction, SchemaEditorActionType } from "./actions";
import { SchemaList } from "./SchemaList";
import { SchemaForm } from "../schema_form";
import { Schema } from "@codotype/types";
import { SchemaListEmptyState } from "./SchemaListEmptyState";

interface SchemaEditorProps {
  schemas: Schema[];
  onChange: (updatedSchemas: Schema[]) => void;
}

export function SchemaEditor(props: SchemaEditorProps) {
  const [state, dispatch]: [SchemaEditorState, Dispatch<SchemaEditorAction>] = React.useReducer(schemaEditorReducer, getInitialState(props.schemas));

  React.useEffect(() => {
    if (state.lastUpdatedTime !== null) {
      props.onChange(state.schemas)
    }
  }, [state.lastUpdatedTime]);

  return (
    <div className="row">
      <div className="col-lg-12">

        <button
          onClick={() => {
            dispatch({
              type: SchemaEditorActionType.EDIT,
              schema: defaultSchema
            })
          }}
        >
          New +
        </button>

        {state.schemas.length === 0 && (
          <SchemaListEmptyState />
        )}

        { state.schemas.length > 0 && (
          <SchemaList
            schemas={state.schemas}
            onEditButtonClick={(schemaToBeEdited: Schema) => {
              dispatch({
                type: SchemaEditorActionType.EDIT,
                schema: schemaToBeEdited
              })
            }}
            onRemoveButtonClick={(schemaToBeRemoved: Schema) => {
              dispatch({
                type: SchemaEditorActionType.REMOVE,
                schema: schemaToBeRemoved
              })
            }}
          />
        )}

        {state.editorModel !== null && (
          <SchemaForm
            schema={state.editorModel}
            onSubmit={(updatedSchema: Schema) => {
              // Creates a new schema
              if (updatedSchema.id === null) {
                dispatch({
                  type: SchemaEditorActionType.CREATE,
                  schema: updatedSchema
                })
                return;
              }

              // Updates an existing schema
              dispatch({
                type: SchemaEditorActionType.UPDATE,
                schema: updatedSchema
              })
            }}
            onCancel={() => {
              dispatch({
                type: SchemaEditorActionType.CLEAR_EDITOR,
              })
            }}
          />
        )}
      </div>
    </div>
  );
}
