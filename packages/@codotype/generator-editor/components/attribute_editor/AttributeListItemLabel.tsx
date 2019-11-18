import { DatatypeMeta } from "./datatype-meta";
import * as React from "react";
import { CodotypeAttribute } from ".";

interface AttributeListItemLabelProps {
  attribute: CodotypeAttribute;
  datatype: DatatypeMeta;
}

export function AttributeListItemLabel(props: AttributeListItemLabelProps) {
  return (
    <small>
        <i className={"mr-1 fa-fw " + props.datatype.icon} title={props.datatype.label} />
        {props.attribute.label }
      <span className='text-danger' v-if="item.required">*</span>

      {/* <b-badge
        v-if="index === 0"
        className='ml-2'
        variant="light"
        title="Title Attribute"
        v-b-tooltip.hover.right
    >
      <i class="fa text-primary fa-tag" />
    </b-badge> */}

    { true && (
      <span
        title="Unique"
        // v-b-tooltip.hover.right
        className="ml-2 badge badge-light"
      >
        <i className="fas fa-snowflake" />
        Unique
      </span>
    )}

    </small >
  );
}
