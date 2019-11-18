import * as React from "react";

/**
 * AttributeMetaFormProps
 * TODO - annotate remaining props
 */
interface AttributeMetaFormProps {
  description: string;
  onDescriptionChange: (updatedDescription: string) => void;
}

/**
 * AttributeMetaForm
 * @param props - see `AttributeMetaFormProps`
 */
export function AttributeMetaForm(props: AttributeMetaFormProps) {
  return (
    <div className="row mt-2">

      <div className="col-lg-12">
        <p className="lead mb-0">Default &amp; Description</p>
        <small className="form-text text-muted">Define a <span className="text-success">Default Value</span> or provide a <span className="text-success">Description</span> to annotate this <strong>Attribute</strong>. Note that <i>not all </i> <strong>Attributes</strong> support <span className="text-success">Default Values</span>.</small>
        <hr />
      </div>

      <div className="col-sm-12">
        {/* help="Describe the purpose or document the constraints of this Attribute" */}
        <input
          type="text"
          placeholder="Description"
          className="form-control"
          value={props.description}
          onChange={e => {
            props.onDescriptionChange(e.currentTarget.value);
          }}
        />
      </div>

      <div className="col-sm-12">
        {/* help="The input field will enforce proper capitalization and spacing." */}
        <input
          type="text"
          placeholder="Default Value"
          className="form-control"
        />
      </div>
    </div>
  );
}
