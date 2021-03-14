import * as React from "react";
import { DATATYPE_META, DatatypeMeta, Datatype } from "@codotype/core";
import { DatatypeIcon } from "./DatatypeIcon";
import classnames from "classnames";
import { Hotkey } from "../Hotkey";

// // // //

interface DatatypeOptionProps {
    active: boolean;
    index: number;
    datatype: DatatypeMeta;
    onClick: (updatedDatatype: Datatype) => void;
}
export function DatatypeOption(props: DatatypeOptionProps) {
    const { datatype, active, index } = props;

    return (
        <React.Fragment>
            {index < 10 && (
                <Hotkey
                    keyName={`shift+${String(index)}`}
                    onKeyDown={() => {
                        props.onClick(datatype.value);
                    }}
                />
            )}
            <div className="col-span-1">
                <button
                    className={classnames(
                        "border-gray-600 border w-full rounded-2xl text-left px-3 py-2",
                        {
                            "bg-gray-600 text-white": active,
                            "bg-transparent hover:bg-gray-600 hover:text-white": !active,
                        },
                    )}
                    onClick={() => {
                        props.onClick(datatype.value);
                    }}
                >
                    <div className="flex items-center justify-between">
                        <div className="flex items-center">
                            <DatatypeIcon
                                className="mr-2"
                                datatype={datatype.value}
                            />
                            <strong>{datatype.label}</strong>
                            <small className="ml-2">
                                {datatype.description}
                            </small>
                        </div>
                        {index < 10 && (
                            <div className="flex text-xs bg-gray-200 px-1 py-1 rounded-lg">
                                shift + {index}
                            </div>
                        )}
                    </div>
                </button>
            </div>
        </React.Fragment>
    );
}

/**
 * AttributeDatatypeFormProps
 * CHORE - annotate remaining props
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
        <div className="grid grid-cols-2 mt-3">
            <div className="col-span-2">
                <p className="lead mb-0">Datatype</p>
                <small className="form-text text-muted">
                    The <span className="text-green-500">Datatype </span>
                    describes the data represented by this&nbsp;
                    <strong>Attribute</strong> - this{" "}
                    <strong>Codotype Plugin</strong> supports{" "}
                    <strong>{props.supportedDatatypes.length} </strong>
                    <span className="text-green-500">Datatypes</span>
                </small>
                <hr />
            </div>

            <div className="col-span-2">
                <div className="grid grid-cols-2 gap-3 mt-3">
                    {Object.keys(DATATYPE_META)
                        .filter((datatype: string) =>
                            props.supportedDatatypes
                                .map(d => String(d))
                                .includes(datatype),
                        )
                        .map((datatype: string, index: number) => {
                            // @ts-ignore
                            const attributeType = DATATYPE_META[datatype];
                            return (
                                <DatatypeOption
                                    key={datatype}
                                    index={index + 1}
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
