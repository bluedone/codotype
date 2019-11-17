import { CodotypeAttribute } from "./index";
import * as React from "react";

interface AttributeListItemProps {
  attribute: CodotypeAttribute;
  onEditButtonClick: (attributeToBeEdited: CodotypeAttribute) => void;
  onRemoveButtonClick: (attributeToBeRemoved: CodotypeAttribute) => void;
}

export function AttributeListItem(props: AttributeListItemProps) {
  return (
    <li className="list-group-item">
      <div className="row">
        <div className="col-lg-12">
          {/* <pre>{JSON.stringify(props.attribute, null, 2)}</pre> */}
          <p>{props.attribute.label}</p>
          <button
            onClick={() => {
              props.onEditButtonClick(props.attribute);
            }}
          >
            Edit
          </button>
          <button
            onClick={() => {
              props.onRemoveButtonClick(props.attribute);
            }}
          >
            Remove
          </button>
        </div>
      </div>
    </li>
  );
}
