import { Schema, DEFAULT_SCHEMA } from "@codotype/types";
import {
  SchemaEditorAction,
  SchemaEditorActionType,
} from "./actions";

/**
 * SchemaEditorState
 * TODO - annotate
 */
export interface SchemaEditorState {
  schemas: Schema[];
  editorModel: null | Schema;
  lastUpdatedTime: string | null;
}

/**
 * defaultSchema
 * TODO - annotate
 */
export const defaultSchema: Schema = { ...DEFAULT_SCHEMA };

/**
 * getUniqueId
 */
export function getUniqueId(): string {
  return Math.random().toString()
}

/**
 * getLastUpdatedTime
 */
export function getLastUpdatedTime(): string {
  return Math.round((new Date()).getTime() / 1000).toString()
}

/**
 * getInitialState
 * @param schemas
 */
export function getInitialState(schemas: Schema[]): SchemaEditorState {
  return {
    schemas: [
      ...schemas
    ],
    editorModel: null,
    lastUpdatedTime: null
  };
}


/**
 * createSchema
 * Creates a new Schema
 * @param state
 * @param newSchema
 */
export function createSchema(state: SchemaEditorState, newSchema: Schema): SchemaEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    schemas: [
      ...state.schemas,
      {
        ...newSchema,
        id: getUniqueId(),
      }
    ]
  }
}

/**
 * editSchema
 * Selects an schema for editing
 * @param state
 * @param newSchema
 */
export function editSchema(state: SchemaEditorState, editSchema: Schema): SchemaEditorState {
  return {
    ...state,
    editorModel: {
      ...editSchema
    }
  }
}

/**
 * updateSchema
 * Selects an schema for editing
 * @param state
 * @param newSchema
 */
export function updateSchema(state: SchemaEditorState, updatedSchema: Schema): SchemaEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    schemas: state.schemas.map((attr: Schema) => {
      if (attr.id === updatedSchema.id) {
        return {
          ...updatedSchema
        };
      }
      return attr;
    }),
  }
}

/**
 * removeSchema
 * Removes an Schema
 * @param state
 * @param newSchema
 */
export function removeSchema(state: SchemaEditorState, toBeRemoved: Schema): SchemaEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    schemas: state.schemas.filter((attr: Schema) => {
      return attr.id !== toBeRemoved.id;
    })
  }
}

/**
 * clearEditor
 * Selects an schema for editing
 * @param state
 * @param newSchema
 */
export function clearEditor(state: SchemaEditorState): SchemaEditorState {
  return {
    ...state,
    editorModel: null
  }
}

/**
 * schemaEditorReducer
 * @param state
 * @param action
 */
export function schemaEditorReducer(state: SchemaEditorState, action: SchemaEditorAction) {
  switch (action.type) {
    case SchemaEditorActionType.CREATE:
      return createSchema(state, action.schema);
    case SchemaEditorActionType.EDIT:
      return editSchema(state, action.schema);
    case SchemaEditorActionType.UPDATE:
      return updateSchema(state, action.schema);
    case SchemaEditorActionType.REMOVE:
      return removeSchema(state, action.schema);
    case SchemaEditorActionType.CLEAR_EDITOR:
      return clearEditor(state);
    default:
      return state;
  }
}

