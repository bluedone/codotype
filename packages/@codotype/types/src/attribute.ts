import { Datatype } from "./datatype";
import { UUID } from "./uuid";

// TODO - add `{ identifiers: TokenCasing } here, replace label+identifier pair
// TODO - break out the following into SchemaEditorConfiguration
// - required
// - unique
// - default_value
// - nullable (new)
// - primary key (new, exclusive 1-per-schema)
// - anything else?
export interface Attribute {
  id: UUID;
  label: string;
  identifier: string;
  description: string;
  required: boolean;
  unique: boolean;
  datatype: Datatype | null;
  default_value: null | string | boolean | number;
  datatypeOptions: { [key: string]: any };
  locked: boolean;
}

export const DEFAULT_ATTRIBUTE: Attribute = {
  id: "",
  label: "",
  identifier: "",
  description: "",
  required: false,
  unique: false,
  datatype: null,
  default_value: null,
  datatypeOptions: {},
  locked: false,
};
