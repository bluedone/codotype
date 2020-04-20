import * as React from "react";
import {
    RELATION_META,
    DatatypeMeta,
    Datatype,
    RelationType,
    RelationMeta,
} from "@codotype/types";

// // // //

interface DatatypeOptionProps {
    relationMeta: RelationMeta;
}
export function DatatypeOption(props: DatatypeOptionProps) {
    return (
        <option value={props.relationMeta.id}>
            {props.relationMeta.label}
        </option>
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
        <div className="mt-2">
            <div className="col-lg-12">
                <div className="row">
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
                                // @ts-ignore
                                const relationMeta = RELATION_META[datatype];
                                return (
                                    <DatatypeOption
                                        key={datatype}
                                        relationMeta={relationMeta}
                                    />
                                );
                            })}
                    </select>
                </div>
            </div>
        </div>
    );
}
