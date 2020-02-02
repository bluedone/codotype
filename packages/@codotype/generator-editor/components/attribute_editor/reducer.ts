import { Attribute, DEFAULT_ATTRIBUTE } from "@codotype/types";
import {
  AttributeEditorAction,
  AttributeEditorActionType,
} from "./actions";

/**
 * AttributeEditorState
 * TODO - annotate
 */
export interface AttributeEditorState {
  attributes: Attribute[];
  editorModel: null | Attribute;
  lastUpdatedTime: string | null;
}

/**
 * defaultAttribute
 * TODO - annotate
 */
export const defaultAttribute: Attribute = { ...DEFAULT_ATTRIBUTE };

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
 * @param attributes
 */
export function getInitialState(attributes: Attribute[]): AttributeEditorState {
  return {
    attributes: [
      ...attributes
    ],
    editorModel: null,
    lastUpdatedTime: null
  };
}


/**
 * createAttribute
 * Creates a new Attribute
 * @param state
 * @param newAttribute
 */
export function createAttribute(state: AttributeEditorState, newAttribute: Attribute): AttributeEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    attributes: [
      ...state.attributes,
      {
        ...newAttribute,
        id: getUniqueId(),
      }
    ]
  }
}

/**
 * editAttribute
 * Selects an attribute for editing
 * @param state
 * @param newAttribute
 */
export function editAttribute(state: AttributeEditorState, editAttribute: Attribute): AttributeEditorState {
  return {
    ...state,
    editorModel: {
      ...editAttribute
    }
  }
}

/**
 * updateAttribute
 * Selects an attribute for editing
 * @param state
 * @param newAttribute
 */
export function updateAttribute(state: AttributeEditorState, updatedAttribute: Attribute): AttributeEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    attributes: state.attributes.map((attr: Attribute) => {
      if (attr.id === updatedAttribute.id) {
        return {
          ...updatedAttribute
        };
      }
      return attr;
    }),
  }
}

/**
 * removeAttribute
 * Removes an Attribute
 * @param state
 * @param newAttribute
 */
export function removeAttribute(state: AttributeEditorState, toBeRemoved: Attribute): AttributeEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    attributes: state.attributes.filter((attr: Attribute) => {
      return attr.id !== toBeRemoved.id;
    })
  }
}

/**
 * clearEditor
 * Selects an attribute for editing
 * @param state
 * @param newAttribute
 */
export function clearEditor(state: AttributeEditorState): AttributeEditorState {
  return {
    ...state,
    editorModel: null
  }
}

/**
 * attributeEditorReducer
 * @param state
 * @param action
 */
export function attributeEditorReducer(state: AttributeEditorState, action: AttributeEditorAction) {
  switch (action.type) {
    case AttributeEditorActionType.CREATE:
      return createAttribute(state, action.attribute);
    case AttributeEditorActionType.EDIT:
      return editAttribute(state, action.attribute);
    case AttributeEditorActionType.UPDATE:
      return updateAttribute(state, action.attribute);
    case AttributeEditorActionType.REMOVE:
      return removeAttribute(state, action.attribute);
    case AttributeEditorActionType.CLEAR_EDITOR:
      return clearEditor(state);
    default:
      return state;
  }
}

