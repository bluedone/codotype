import { Attribute } from "@codotype/types";

export enum AttributeEditorActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  REMOVE = "REMOVE",
  EDIT = "EDIT",
  CLEAR_EDITOR = "CLEAR_EDITOR",
}

export interface AttributeEditorDefaultAction {
  type: AttributeEditorActionType;
  attribute: Attribute;
}

export interface AttributeEditorClearEditorAction {
  type: AttributeEditorActionType.CLEAR_EDITOR;
}

export type AttributeEditorAction = AttributeEditorDefaultAction | AttributeEditorClearEditorAction;
