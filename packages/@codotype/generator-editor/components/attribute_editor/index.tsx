export { AttributeEditor } from "./component";
export interface CodotypeAttribute {
  id: string | null;
  label: string;
  identifier: string;
  datatype: string; // TODO - should be an ENUM
  help: string;
  required: boolean;
  unique: boolean;
  default_value: string | number | boolean | null;
  // datatypeOptions: {} // TODO - are we using this?
}