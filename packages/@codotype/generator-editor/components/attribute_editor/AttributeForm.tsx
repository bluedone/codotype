import { AttributePropertiesForm } from "./AttributePropertiesForm";
import { AttributeDatatypeForm } from "./AttributeDatatypeForm";
import { AttributeMetaForm } from "./AttributeMetaForm";
import { Datatype, Attribute } from "@codotype/types";
import { sanitizeLabel, makeIdentifier } from "@codotype/util";
import * as React from "react";

/**
 * AttributeFormProps
 * `editorModel` - the `Attribute` currently being edited
 * `supportedDatatypes` - the unique IDs of supported datatypes made available in the form
 * `onSubmit` - submits the form to either create or update a `Attribute`
 * `onCancel` - closes the formw
 */
interface AttributeFormProps {
  attributes: Attribute[];
  editorModel: Attribute;
  supportedDatatypes: Datatype[];
  onSubmit: (updatedAttribute: Attribute) => void;
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
  const [datatype, setDatatype] = React.useState<Datatype|null>(
    props.editorModel.datatype
  );

  /**
   * setLabelAndIdentifier
   * TODO - implement `sanitizeLabel` function here
   * @param updatedLabel
   */
  function setLabelAndIdentifier(updatedLabel: string) {
    const sanitizedLabel: string = sanitizeLabel(updatedLabel);
    setLabel(sanitizedLabel);
    setIdentifier(makeIdentifier(sanitizedLabel));
  }

  return (
    <div className="card card-body mt-4">
      <div className="row">
        <div className="col-lg-12">
          {!datatype && (
            <AttributeDatatypeForm
              datatype={datatype}
              supportedDatatypes={props.supportedDatatypes}
              onChangeDatatype={updatedDatatype => {
                setDatatype(updatedDatatype);
              }}
            />
          )}

          { datatype && (
            <React.Fragment>
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
            </React.Fragment>
          )}

          <button
            disabled={!canSubmit(label)}
            onClick={() => {
              props.onSubmit({
                ...props.editorModel,
                label: label.trim(),
                identifier: identifier.trim(),
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
    </div>
  );
}
