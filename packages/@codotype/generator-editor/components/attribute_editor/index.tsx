export { AttributeEditor } from "./component";

export interface CodotypeAttribute {
  id: string | null;
  label: string;
  identifier: string;
  datatype: string;
  description: string;
  required: boolean;
  unique: boolean;
  default_value: string | number | boolean | null;
  locked: boolean;
  // datatypeOptions: {} // TODO - are we using this?
}