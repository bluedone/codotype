import { CodotypeAttribute } from "./index";
import * as React from "react";

/**
 * AttributeFormProps
 * `editorModel` - the `CodotypeAttribute` currently being edited
 * `supportedAttributes` - the unique IDs of supported datatypes made available in the form
 * `onSubmit` - submits the form to either create or update a `CodotypeAttribute`
 * `onCancel` - closes the formw
 */
interface AttributeFormProps {
  attributes: CodotypeAttribute[];
  editorModel: CodotypeAttribute;
  supportedAttributes: string[];
  onSubmit: (updatedAttribute: CodotypeAttribute) => void;
  onCancel: () => void;
}

/**
 * canSubmit
 * @param label
 */
export function canSubmit(label: string): boolean {
  return label !== ""
}

// TODO - this component will need its own reducer + actions to manage
// currentStep
// current editorModel
// canSubmit state

/**
 * AttributeForm
 * @param props - see `AttributeFormProps`
 */
export function AttributeForm(props: AttributeFormProps) {
  const [label, setLabel] = React.useState<string>(props.editorModel.label);
  const [identifier, setIdentifier] = React.useState<string>(props.editorModel.identifier);

  /**
   * setLabelAndIdentifier
   * @param updatedLabel
   */
  function setLabelAndIdentifier(updatedLabel: string) {
    setLabel(updatedLabel);
    setIdentifier(updatedLabel.toLowerCase());
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <input
          type="text"
          placeholder="Label"
          value={label}
          onChange={(e) => {
            setLabelAndIdentifier(e.currentTarget.value)
          }}
        />

        <input
          type="text"
          placeholder="Identifier"
          value={identifier}
          onChange={(e) => {
            setIdentifier(e.currentTarget.value)
          }}
        />

        <button
          disabled={!canSubmit(label)}
          onClick={() => {
            props.onSubmit({
              ...props.editorModel,
              label,
            })
          }}
        >
          Save
        </button>

        <button
          onClick={props.onCancel}
        >
          Cancel
        </button>
      </div>
    </div>
  );
}
