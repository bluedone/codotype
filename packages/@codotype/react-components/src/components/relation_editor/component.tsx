import * as React from "react";
import { SortableListHeader } from "../sortable_list_header";

// // // //

export function RelationEditor() {
    return (
        <div className="card">
            <SortableListHeader label="Relations" />
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Relation</li>
            </ul>
        </div>
    );
}
