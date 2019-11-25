import { Schema } from "@codotype/types";

export enum SchemaEditorActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  REMOVE = "REMOVE",
  EDIT = "EDIT",
  CLEAR_EDITOR = "CLEAR_EDITOR",
}

export interface SchemaEditorDefaultAction {
  type: SchemaEditorActionType;
  schema: Schema;
}

export interface SchemaEditorClearEditorAction {
  type: SchemaEditorActionType.CLEAR_EDITOR;
}

export type SchemaEditorAction = SchemaEditorDefaultAction | SchemaEditorClearEditorAction;
