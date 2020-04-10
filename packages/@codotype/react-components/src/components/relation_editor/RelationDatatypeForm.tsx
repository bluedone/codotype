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
    active: boolean;
    relationMeta: RelationMeta;
    onClick: (updatedDatatype: RelationType) => void;
}
export function DatatypeOption(props: DatatypeOptionProps) {
    let buttonClassName: string = "btn btn-outline-dark btn-block text-left";
    if (props.active) {
        buttonClassName += " active";
    }

    return (
        <div className="col-sm-6 my-2">
            <button
                className={buttonClassName}
                onClick={() => {
                    props.onClick(props.relationMeta.id);
                }}
            >
                <strong>{props.relationMeta.label}</strong>
                <small className="ml-2">{props.relationMeta.description}</small>
            </button>
        </div>
    );
}

/**
 * RelationDatatypeFormProps
 * TODO - annotate remaining props
 */
interface RelationDatatypeFormProps {
    type: RelationType | null;
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
                <p className="lead mb-0">Datatype</p>
                <small className="form-text text-muted">
                    The <span className="text-success">Datatype</span>
                    describes the data represented by this
                    <strong>Relation</strong> - this{" "}
                    <strong>Codotype Generator</strong> supports{" "}
                    <strong>{"X"} </strong>
                    <span className="text-success">Datatypes</span>
                </small>
                <hr />
            </div>

            <div className="col-lg-12">
                <div className="row">
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
                                    active={props.type === relationMeta.value}
                                    onClick={props.onChangeRelationType}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
