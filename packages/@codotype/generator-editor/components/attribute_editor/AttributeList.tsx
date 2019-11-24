import { Attribute } from "@codotype/types";
import * as React from "react";
import { AttributeListItem } from "./AttributeListItem";

interface AttributeListProps {
  attributes: Attribute[];
  onEditButtonClick: (attributeToBeEdited: Attribute) => void;
  onRemoveButtonClick: (attributeToBeRemoved: Attribute) => void;
}

export function AttributeList(props: AttributeListProps) {
  return (
    <ul className="list-group">
      {props.attributes.map((attr: Attribute) => {
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
