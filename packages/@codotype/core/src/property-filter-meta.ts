import { StringValueFilter, NumberValueFilter } from "./property-filter";

export interface PropertyValueFilterMeta {
  label: string; // "Lowercase"
  id: StringValueFilter | NumberValueFilter;
  description: string; // "Transforms the input value into lowercase"
  documentation: string; // "Includes input + output examples"
}

// Defines PROPERTY_FILTER_META metadata
// TODO - define + export PROPERTY_FILTER_META
// export const PROPERTY_FILTER_META: {
//   [key in StringValueFilter & NumberValueFilter]: PropertyValueFilterMeta;
// } = {
//   [StringValueFilter.camelcase]: {
//     id: StringValueFilter.camelcase,
//     label: "Camel Case",
//     description: "Transforms the input into Camel Case",
//     documentation: "Turns `camel case string` into `camelCaseString`",
//   },
// };
