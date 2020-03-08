import * as React from "react";

/**
 * AttributePropertiesFormProps
 * TODO - annotate remaining props
 */
interface AttributePropertiesFormProps {
  label: string;
  identifier: string;
  required: boolean;
  unique: boolean;
  onLabelChange: (updatedLabel: string) => void;
  onIdentifierChange: (updatedIdentifier: string) => void;
  onRequiredChange: (updatedRequired: boolean) => void;
  onUniqueChange: (updatedUnique: boolean) => void;
}

/**
 * AttributePropertiesForm
 * @param props - see `AttributePropertiesFormProps`
 */
export function AttributePropertiesForm(props: AttributePropertiesFormProps) {
  return (
    <div className="row mt-2">
      <div className="col-lg-12">
        <p className="lead mb-0">Properties</p>
        <small className="text-muted">
          Define the <span className="text-success">Tokens</span> for this{" "}
          <strong>Attribute</strong> and set its{" "}
          <span className="text-success">Required</span> and{" "}
          <span className="text-success">Unique</span> constraints.
        </small>
        <hr />
      </div>

      <div className="col-sm-12 col-lg-6">
        {/* help="The input field will enforce proper capitalization and spacing." */}
        <input
          type="text"
          placeholder="Label"
          className="form-control"
          value={props.label}
          onChange={e => {
            props.onLabelChange(e.currentTarget.value);
          }}
        />
      </div>

      <div className="col-sm-12 col-lg-6">
        {/* help="Supply a camel-cased or snake-cased value - no whitespace." */}
        <input
          type="text"
          placeholder="Identifier"
          className="form-control"
          value={props.identifier}
          onChange={e => {
            props.onIdentifierChange(e.currentTarget.value);
          }}
        />
      </div>

      <div className="col-lg-6 col-sm-12">
        {/* help="Whether or not this Attribute is required." */}
        <p>Required?</p>
        <input
          type="checkbox"
          checked={props.required}
          onChange={e => {
            props.onRequiredChange(e.currentTarget.checked);
          }}
        />
      </div>
      <div className="col-lg-6 col-sm-12">
        {/* v-if="![DATATYPE_JSON, DATATYPE_BOOLEAN].includes(model.datatype)" */}
        {/* help="Whether or not to enforce unique values for this Attribute." */}
        <p>Unique?</p>
        <input
          type="checkbox"
          checked={props.unique}
          onChange={e => {
            props.onUniqueChange(e.currentTarget.checked);
          }}
        />
      </div>
    </div>
  );
}
