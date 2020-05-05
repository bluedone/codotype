import * as React from "react";
import classnames from "classnames";
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
        <div className="mt-2">
            <div className="col-lg-12">
                <div className="row">
                    {/* <select
                        className="form-control"
                        value={props.type}
                        onChange={e => {
                            // @ts-ignore
                            props.onChangeRelationType(e.currentTarget.value);
                        }}
                    >
                    </select> */}
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
                                <button
                                    key={relationMeta.id}
                                    className={classnames({
                                        "btn btn-sm btn-outline-primary": true,
                                        active: relationMeta.id === props.type,
                                    })}
                                    // relationMeta={relationMeta}
                                    onClick={e => {
                                        // @ts-ignore
                                        props.onChangeRelationType(
                                            relationMeta.id,
                                        );
                                    }}
                                >
                                    {relationMeta.label}
                                    {relationMeta.description}
                                </button>
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
