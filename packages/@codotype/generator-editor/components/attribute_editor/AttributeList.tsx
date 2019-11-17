import { CodotypeAttribute } from "./index";
import * as React from "react";
import { AttributeListItem } from "./AttributeListItem";

interface AttributeListProps {
  attributes: CodotypeAttribute[];
  onEditButtonClick: (attributeToBeEdited: CodotypeAttribute) => void;
  onRemoveButtonClick: (attributeToBeRemoved: CodotypeAttribute) => void;
}

export function AttributeList(props: AttributeListProps) {
  return (
    <ul className="list-group">
      {props.attributes.map((attr: CodotypeAttribute) => {
        return (
          <AttributeListItem
            key={String(attr.id)}
            attribute={attr}
            onEditButtonClick={props.onEditButtonClick}
            onRemoveButtonClick={props.onRemoveButtonClick}
          />
        )
      })}
    </ul>
  );
}
