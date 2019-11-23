import { CodotypeAttribute } from "./index";
import { DestroyButton } from "./DestroyButton";
import { AttributeListItemLabel } from "./AttributeListItemLabel";
import { DATATYPE_META } from "./datatype-meta";
import * as React from "react";

interface AttributeListItemProps {
  attribute: CodotypeAttribute;
  onEditButtonClick: (attributeToBeEdited: CodotypeAttribute) => void;
  onRemoveButtonClick: (attributeToBeRemoved: CodotypeAttribute) => void;
}

export function AttributeListItem(props: AttributeListItemProps) {
  return (
    <li className="list-group-item">

      <div className="row d-flex align-items-center">

        <div className="col-sm-10">
          <AttributeListItemLabel
            attribute={props.attribute}
            datatype={DATATYPE_META[props.attribute.datatype]}
          />
        </div>

        {props.attribute.locked && (
          <div className="col-sm-2 text-right controls justify-content-end" v-if="item.locked">
            <span
              className=" badge badge-secondary"
              // v-b-tooltip.hover.right
              title="Attribute may not be edited or removed"
            >
              <i className="fa fa-fw fa-lock" />
            </span>
          </div>
        )}

        {!props.attribute.locked && (
          <div className="col-sm-2 text-right controls" v-else>
            Dropdown
          </div >
        )}
      </div>

      <div className="row">
        <div className="col-lg-12">
          {/* <p>{props.attribute.label}</p> */}
          <button
            onClick={() => {
              props.onEditButtonClick(props.attribute);
            }}
          >
            Edit
          </button>
          <DestroyButton
            onClick={() => {
              props.onRemoveButtonClick(props.attribute);
            }}
          />
        </div>
      </div>
    </li>
  );
}
