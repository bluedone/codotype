import { DestroyButton } from "./DestroyButton";
import { Schema } from "@codotype/types";
import * as React from "react";

interface SchemaListItemProps {
  schema: Schema;
  onEditButtonClick: (schemaToBeEdited: Schema) => void;
  onRemoveButtonClick: (schemaToBeRemoved: Schema) => void;
}

export function SchemaListItem(props: SchemaListItemProps) {
  return (
    <li className="list-group-item">

      <div className="row d-flex align-items-center">

        <div className="col-sm-10">
          <p>{props.schema.label}</p>
        </div>

        {props.schema.locked && (
          <div className="col-sm-2 text-right controls justify-content-end" v-if="item.locked">
            <span
              className=" badge badge-secondary"
              // v-b-tooltip.hover.right
              title="Schema may not be edited or removed"
            >
              <i className="fa fa-fw fa-lock" />
            </span>
          </div>
        )}

        {!props.schema.locked && (
          <div className="col-sm-2 text-right controls" v-else>
            Dropdown
          </div >
        )}
      </div>

      <div className="row">
        <div className="col-lg-12">
          {/* <p>{props.schema.label}</p> */}
          <button
            onClick={() => {
              props.onEditButtonClick(props.schema);
            }}
          >
            Edit
          </button>
          <DestroyButton
            onClick={() => {
              props.onRemoveButtonClick(props.schema);
            }}
          />
        </div>
      </div>
    </li>
  );
}
