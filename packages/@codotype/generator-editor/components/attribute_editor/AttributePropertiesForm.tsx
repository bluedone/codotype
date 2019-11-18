import * as React from "react";

/**
 * AttributePropertiesFormProps
 * TODO - annotate remaining props
 */
interface AttributePropertiesFormProps {
  label: string;
  identifier: string;
  onLabelChange: (updatedLabel: string) => void;
  onIdentifierChange: (updatedIdentifier: string) => void;
}

/**
 * AttributePropertiesForm
 * @param props - see `AttributePropertiesFormProps`
 */
export function AttributePropertiesForm(props: AttributePropertiesFormProps) {
  return (
    <div className="row">
      <div className="col-lg-12">
        <input
          type="text"
          placeholder="Label"
          value={props.label}
          onChange={e => {
            props.onLabelChange(e.currentTarget.value);
          }}
        />

        <input
          type="text"
          placeholder="Identifier"
          value={props.identifier}
          onChange={e => {
            props.onIdentifierChange(e.currentTarget.value);
          }}
        />
      </div>
    </div>
  );
}
