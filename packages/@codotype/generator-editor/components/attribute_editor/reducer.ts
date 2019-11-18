import { CodotypeAttribute } from "./index";
import {
  AttributeEditorAction,
  AttributeEditorActionType,
} from "./actions";

/**
 * AttributeEditorState
 * TODO - annotate
 */
export interface AttributeEditorState {
  attributes: CodotypeAttribute[];
  editorModel: null | CodotypeAttribute;
  lastUpdatedTime: string | null;
}

/**
 * defaultAttribute
 * TODO - annotate
 */
export const defaultAttribute: CodotypeAttribute = {
  id: null,
  label: "",
  identifier: "",
  datatype: "",
  description: "",
  required: false,
  unique: false,
  default_value: null,
  locked: false,
};

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
export function getInitialState(attributes: CodotypeAttribute[]): AttributeEditorState {
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
export function createAttribute(state: AttributeEditorState, newAttribute: CodotypeAttribute): AttributeEditorState {
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
export function editAttribute(state: AttributeEditorState, editAttribute: CodotypeAttribute): AttributeEditorState {
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
export function updateAttribute(state: AttributeEditorState, updatedAttribute: CodotypeAttribute): AttributeEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    attributes: state.attributes.map((attr: CodotypeAttribute) => {
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
export function removeAttribute(state: AttributeEditorState, toBeRemoved: CodotypeAttribute): AttributeEditorState {
  return {
    ...state,
    editorModel: null,
    lastUpdatedTime: getLastUpdatedTime(),
    attributes: state.attributes.filter((attr: CodotypeAttribute) => {
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

