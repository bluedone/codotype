import * as React from "react";
import { DATATYPE_META, DatatypeMeta, Datatype } from "@codotype/core";
import { DatatypeIcon } from "./DatatypeIcon";

// // // //

interface DatatypeOptionProps {
    active: boolean;
    datatype: DatatypeMeta;
    onClick: (updatedDatatype: Datatype) => void;
}
export function DatatypeOption(props: DatatypeOptionProps) {
    let buttonClassName = "btn btn-outline-dark btn-block text-left";
    if (props.active) {
        buttonClassName += " active";
    }

    return (
        <div className="col-sm-6 my-2">
            <button
                className={buttonClassName}
                onClick={() => {
                    props.onClick(props.datatype.value);
                }}
            >
                <DatatypeIcon
                    className="mr-2"
                    datatype={props.datatype.value}
                />
                <strong>{props.datatype.label}</strong>
                <small className="ml-2">{props.datatype.description}</small>
            </button>
        </div>
    );
}

/**
 * AttributeDatatypeFormProps
 * TODO - annotate remaining props
 */
interface AttributeDatatypeFormProps {
    datatype: Datatype | null;
    supportedDatatypes: Datatype[];
    onChangeDatatype: (updatedDatatype: Datatype) => void;
}

/**
 * AttributeDatatypeForm
 * @param props - see `AttributeDatatypeFormProps`
 */
export function AttributeDatatypeForm(props: AttributeDatatypeFormProps) {
    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                <p className="lead mb-0">Datatype</p>
                <small className="form-text text-muted">
                    The <span className="text-success">Datatype </span>
                    describes the data represented by this&nbsp;
                    <strong>Attribute</strong> - this{" "}
                    <strong>Codotype Generator</strong> supports{" "}
                    <strong>{props.supportedDatatypes.length} </strong>
                    <span className="text-success">Datatypes</span>
                </small>
                <hr />
            </div>

            <div className="col-lg-12">
                <div className="row">
                    {Object.keys(DATATYPE_META)
                        .filter((datatype: string) =>
                            props.supportedDatatypes
                                .map(d => String(d))
                                .includes(datatype),
                        )
                        .map((datatype: string) => {
                            // @ts-ignore
                            const attributeType = DATATYPE_META[datatype];
                            return (
                                <DatatypeOption
                                    key={datatype}
                                    datatype={attributeType}
                                    active={
                                        props.datatype === attributeType.value
                                    }
                                    onClick={props.onChangeDatatype}
                                />
                            );
                        })}
                </div>
            </div>
        </div>
    );
}
