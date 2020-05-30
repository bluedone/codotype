import * as React from "react";
import { RELATION_META, RelationType, RelationMeta } from "@codotype/types";

// // // //

interface DatatypeOptionProps {
    relationMeta: RelationMeta;
}
export function DatatypeOption(props: DatatypeOptionProps) {
    return (
        <button value={props.relationMeta.id}>
            {props.relationMeta.label}
        </button>
    );
}

/**
 * RelationDatatypeFormProps
 * TODO - annotate remaining props
 */
interface RelationDatatypeFormProps {
    type: RelationType;
    supportedRelationTypes: RelationType[];
    onChangeRelationType: (updatedDatatype: RelationType) => void;
}

/**
 * RelationDatatypeForm
 * @param props - see `RelationDatatypeFormProps`
 */
export function RelationDatatypeForm(props: RelationDatatypeFormProps) {
    return (
        <select
            className="form-control"
            value={props.type}
            onChange={e => {
                // @ts-ignore
                props.onChangeRelationType(e.currentTarget.value);
            }}
        >
            {Object.keys(RELATION_META)
                .filter((datatype: string) =>
                    props.supportedRelationTypes
                        .map(d => String(d))
                        .includes(datatype),
                )
                .map((datatype: string) => {
                    const relationMeta: RelationMeta =
                        // @ts-ignore
                        RELATION_META[datatype];
                    return (
                        <option key={relationMeta.id}>
                            {relationMeta.label}
                        </option>
                    );
                })}
        </select>
    );
}
