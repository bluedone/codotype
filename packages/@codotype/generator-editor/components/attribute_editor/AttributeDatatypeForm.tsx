import * as React from "react";
import {
  DATATYPE_META,
  DatatypeMeta,
} from "./datatype-meta";
import { Datatype } from "./datatype";

interface DatatypeOptionProps {
  active: boolean;
  datatype: DatatypeMeta;
  onClick: (updatedDatatype: string) => void;
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
          props.onClick(props.datatype.value);
        }}
        >
        <i className={`fa-fw mr-2 ${props.datatype.icon}`} />
        <strong>{ props.datatype.label }</strong>
        <small className='ml-2'>{ props.datatype.description }</small>
      </button>
    </div>
  )
}

/**
 * AttributeDatatypeFormProps
 * TODO - annotate remaining props
 */
interface AttributeDatatypeFormProps {
  datatype: string;
  supportedDatatypes: Datatype[];
  onChangeDatatype: (updatedDatatype: string) => void;
}


/**
 * AttributeDatatypeForm
 * @param props - see `AttributeDatatypeFormProps`
 */
export function AttributeDatatypeForm(props: AttributeDatatypeFormProps) {
  return (
    <div className="mt-2">
      <div className="col-lg-12">
        <p className="lead mb-0">Datatype</p>
        <small className="form-text text-muted">
          The <span className="text-success">Datatype</span>
          describes the data represented by this
          <strong>Attribute</strong> - this <strong>Codotype Generator</strong>{" "}
          supports <strong>{"X"} </strong>
          <span className="text-success">Datatypes</span>
        </small>
        <hr />
      </div>

      <div className="col-lg-12">
        <div className="row">
          {Object.keys(DATATYPE_META)
            .filter((datatype: string) =>
              props.supportedDatatypes.map(d=> String(d)).includes(datatype)
            )
            .map((datatype: string) => {
              const attributeType = DATATYPE_META[datatype];
              return (
                <DatatypeOption
                  key={datatype}
                  datatype={attributeType}
                  active={props.datatype === attributeType.value}
                  onClick={props.onChangeDatatype}
                />
              );
            })}
        </div>
      </div>
    </div>
  );
}
