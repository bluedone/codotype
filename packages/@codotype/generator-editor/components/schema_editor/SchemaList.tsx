import { Schema } from "@codotype/types";
import * as React from "react";
import { SchemaListItem } from "./SchemaListItem";

interface SchemaListProps {
  schemas: Schema[];
  onEditButtonClick: (schemaToBeEdited: Schema) => void;
  onRemoveButtonClick: (schemaToBeRemoved: Schema) => void;
}

export function SchemaList(props: SchemaListProps) {
  return (
    <ul className="list-group">
      {props.schemas.map((attr: Schema) => {
        return (
          <SchemaListItem
            key={String(attr.id)}
            schema={attr}
            onEditButtonClick={props.onEditButtonClick}
            onRemoveButtonClick={props.onRemoveButtonClick}
          />
        )
      })}
    </ul>
  );
}
