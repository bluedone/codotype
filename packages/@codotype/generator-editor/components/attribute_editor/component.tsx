import { CodotypeAttribute } from "./index";
import { AttributeEditorState, attributeEditorReducer, getInitialState, defaultAttribute } from "./reducer";
import * as React from "react";
import { Dispatch } from "react";
import { AttributeEditorAction, AttributeEditorActionType } from "./actions";
import { AttributeList } from "./AttributeList";
import { AttributeForm } from "./AttributeForm";
import { Datatype } from "./datatype";
import { AttributeListEmptyState } from "./AttributeListEmptyState";

interface AttributeEditorProps {
  attributes: CodotypeAttribute[];
  supportedDatatypes: Datatype[];
  onChange: (updatedAttributes: CodotypeAttribute[]) => void;
}

export function AttributeEditor(props: AttributeEditorProps) {
  const [state, dispatch]: [AttributeEditorState, Dispatch<AttributeEditorAction>] = React.useReducer(attributeEditorReducer, getInitialState(props.attributes));

  React.useEffect(() => {
    if (state.lastUpdatedTime !== null) {
      props.onChange(state.attributes)
    }
  }, [state.lastUpdatedTime]);

  return (
    <div className="row">
      <div className="col-lg-12">

        <button
          onClick={() => {
            dispatch({
              type: AttributeEditorActionType.EDIT,
              attribute: defaultAttribute
            })
          }}
        >
          New +
        </button>

        {state.attributes.length === 0 && (
          <AttributeListEmptyState />
        )}

        { state.attributes.length > 0 && (
          <AttributeList
            attributes={state.attributes}
            onEditButtonClick={(attributeToBeEdited: CodotypeAttribute) => {
              dispatch({
                type: AttributeEditorActionType.EDIT,
                attribute: attributeToBeEdited
              })
            }}
            onRemoveButtonClick={(attributeToBeRemoved: CodotypeAttribute) => {
              dispatch({
                type: AttributeEditorActionType.REMOVE,
                attribute: attributeToBeRemoved
              })
            }}
          />
        )}

        {state.editorModel !== null && (
          <AttributeForm
            attributes={state.attributes}
            editorModel={state.editorModel}
            supportedDatatypes={props.supportedDatatypes}
            onSubmit={(updatedAttribute: CodotypeAttribute) => {
              // Creates a new attribute
              if (updatedAttribute.id === null) {
                dispatch({
                  type: AttributeEditorActionType.CREATE,
                  attribute: updatedAttribute
                })
                return;
              }

              // Updates an existing attribute
              dispatch({
                type: AttributeEditorActionType.UPDATE,
                attribute: updatedAttribute
              })
            }}
            onCancel={() => {
              dispatch({
                type: AttributeEditorActionType.CLEAR_EDITOR,
              })
            }}
          />
        )}
      </div>
    </div>
  );
}
