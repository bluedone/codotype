import { CodotypeAttribute } from "./index";
import { AttributePropertiesForm } from "./AttributePropertiesForm";
import { AttributeDatatypeForm } from "./AttributeDatatypeForm";
import { AttributeMetaForm } from "./AttributeMetaForm";
import { Datatype } from "./datatype";
import * as React from "react";

/**
 * AttributeFormProps
 * `editorModel` - the `CodotypeAttribute` currently being edited
 * `supportedDatatypes` - the unique IDs of supported datatypes made available in the form
 * `onSubmit` - submits the form to either create or update a `CodotypeAttribute`
 * `onCancel` - closes the formw
 */
interface AttributeFormProps {
  attributes: CodotypeAttribute[];
  editorModel: CodotypeAttribute;
  supportedDatatypes: Datatype[];
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
  const [required, setRequired] = React.useState<boolean>(props.editorModel.required);
  const [unique, setUnique] = React.useState<boolean>(props.editorModel.unique);
  const [description, setDescription] = React.useState<string>(props.editorModel.description);
  const [datatype, setDatatype] = React.useState<string>(
    props.editorModel.datatype
  );

  /**
   * setLabelAndIdentifier
   * TODO - implement `sanitizeLabel` function here
   * @param updatedLabel
   */
  function setLabelAndIdentifier(updatedLabel: string) {
    setLabel(updatedLabel);
    setIdentifier(updatedLabel.toLowerCase());
  }

  return (
    <div className="row">
      <div className="col-lg-12">
        <AttributeDatatypeForm
          datatype={datatype}
          supportedDatatypes={props.supportedDatatypes}
          onChangeDatatype={updatedDatatype => {
            setDatatype(updatedDatatype);
          }}
        />

        <AttributePropertiesForm
          label={label}
          identifier={identifier}
          required={required}
          unique={unique}
          onLabelChange={(updatedLabel: string) => {
            setLabelAndIdentifier(updatedLabel);
          }}
          onIdentifierChange={setIdentifier}
          onRequiredChange={setRequired}
          onUniqueChange={setUnique}
        />

        <AttributeMetaForm
          description={description}
          onDescriptionChange={setDescription}
        />

        <button
          disabled={!canSubmit(label)}
          onClick={() => {
            props.onSubmit({
              ...props.editorModel,
              label,
              identifier,
              datatype,
              required,
              unique,
              description,
            });
          }}
        >
          Save
        </button>

        <button onClick={props.onCancel}>Cancel</button>
      </div>
    </div>
  );
}
