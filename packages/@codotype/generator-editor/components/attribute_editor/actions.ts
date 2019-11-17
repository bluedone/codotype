import { CodotypeAttribute } from "./index";

export enum AttributeEditorActionType {
  CREATE = "CREATE",
  UPDATE = "UPDATE",
  REMOVE = "REMOVE",
  EDIT = "EDIT",
  CLEAR_EDITOR = "CLEAR_EDITOR",
}

export interface AttributeEditorDefaultAction {
  type: AttributeEditorActionType;
  attribute: CodotypeAttribute;
}

export interface AttributeEditorClearEditorAction {
  type: AttributeEditorActionType.CLEAR_EDITOR;
}

export type AttributeEditorAction = AttributeEditorDefaultAction | AttributeEditorClearEditorAction;
