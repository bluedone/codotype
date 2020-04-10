import { Datatype } from "./datatype";
import { UUID } from "./uuid";

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
  id: null,
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
