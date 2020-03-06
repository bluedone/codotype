import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";
import { Attribute } from "../types";

// // // //

export function AttributeEditor(props: { attributes: Attribute[] }) {
    if (props.attributes.length === 0) {
        return <div className="card">No attributes defined</div>;
    }

    // Render list
    return (
        <div className="card">
            <SortableListHeader label="Attributes" />
            <ul className="list-group list-group-flush">
                {props.attributes.map((a: Attribute) => {
                    return (
                        <li key={a.id} className="list-group-item">
                            {a.label}
                        </li>
                    );
                })}
            </ul>
        </div>
    );
}
