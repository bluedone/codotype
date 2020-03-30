import { RelationPropertiesForm } from "./RelationPropertiesForm";
import { RelationDatatypeForm } from "./RelationDatatypeForm";
import { RelationMetaForm } from "./RelationMetaForm";
import { Relation, Datatype } from "../types";
import { sanitizeLabel, makeIdentifier } from "@codotype/util";
import * as React from "react";
import { RelationInput } from "./RelationFormModal";

// // // //

function FormGroupTab(props: {
    label: string;
    active: boolean;
    disabled: boolean;
    onClick: () => void;
}) {
    const { label } = props;
    const btnClassName: string[] = ["btn btn-block nav-link w-100"];
    if (props.active) {
        btnClassName.push("active");
    }

    return (
        <li className="nav-item d-flex flex-grow-1">
            <button
                // href="#"
                // TODO - fix styles here, replace with <button>
                className={btnClassName.join(" ")}
                disabled={props.disabled}
                style={{
                    cursor: "pointer",
                }}
                onClick={props.onClick}
            >
                {label}
            </button>
        </li>
    );
}

/**
 * RelationFormSelector
 */
export function RelationFormSelector(props: {
    relationInput: RelationInput;
    children: (childProps: {
        selectedForm: string;
        setSelectedForm: (updatedSelectedGroup: string) => void;
    }) => React.ReactNode;
}) {
    const { relationInput } = props;
    const defaultSelectedForm =
        relationInput.datatype === null ? "DATATYPE" : "PROPERTIES";

    const [selectedForm, setSelectedForm] = React.useState<string>(
        defaultSelectedForm,
    );

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="nav nav-tabs w-100 d-flex">
                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("DATATYPE");
                        }}
                        disabled={relationInput.datatype === null}
                        active={selectedForm === "DATATYPE"}
                        label={"Datatype"}
                    />

                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("PROPERTIES");
                        }}
                        disabled={relationInput.datatype === null}
                        active={selectedForm === "PROPERTIES"}
                        label={"Properties"}
                    />

                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("DESCRIPTION");
                        }}
                        disabled={relationInput.datatype === null}
                        active={selectedForm === "DESCRIPTION"}
                        label={"Default & Description"}
                    />
                </ul>
            </div>
            <div className="col-lg-12">
                {props.children({ selectedForm, setSelectedForm })}
            </div>
        </div>
    );
}

// // // //

/**
 * RelationFormProps
 * `relationInput` - the `Attribute` currently being edited
 * `supportedDatatypes` - the unique IDs of supported datatypes made available in the form
 */
interface RelationFormProps {
    relations: Relation[];
    relationInput: RelationInput;
    supportedDatatypes: Datatype[];
    onChange: (updatedRelationInput: RelationInput) => void;
}

/**
 * RelationForm
 * @param props - see `RelationFormProps`
 */
export function RelationForm(props: RelationFormProps) {
    const { relationInput, supportedDatatypes } = props;

    return (
        <div className="row">
            <div className="col-lg-12">
                {/* {!relationInput.datatype && (
                    <RelationDatatypeForm
                        datatype={relationInput.datatype}
                        supportedDatatypes={supportedDatatypes}
                        onChangeDatatype={updatedDatatype => {
                            props.onChange({
                                ...relationInput,
                                datatype: updatedDatatype,
                            });
                        }}
                    />
                )} */}

                {/* {relationInput.datatype && ( */}
                {true && (
                    <React.Fragment>
                        <RelationFormSelector relationInput={relationInput}>
                            {({ selectedForm, setSelectedForm }) => {
                                if (selectedForm === "DATATYPE") {
                                    return (
                                        <RelationDatatypeForm
                                            datatype={relationInput.datatype}
                                            supportedDatatypes={
                                                supportedDatatypes
                                            }
                                            onChangeDatatype={updatedDatatype => {
                                                props.onChange({
                                                    ...relationInput,
                                                    datatype: updatedDatatype,
                                                });
                                                setSelectedForm("PROPERTIES");
                                            }}
                                        />
                                    );
                                }

                                if (selectedForm === "PROPERTIES") {
                                    return (
                                        <RelationPropertiesForm
                                            label={relationInput.label}
                                            identifier={
                                                relationInput.identifier
                                            }
                                            required={relationInput.required}
                                            unique={relationInput.unique}
                                            onLabelChange={(
                                                updatedLabel: string,
                                            ) => {
                                                const sanitizedLabel: string = sanitizeLabel(
                                                    updatedLabel,
                                                );
                                                props.onChange({
                                                    ...relationInput,
                                                    label: sanitizedLabel,
                                                    identifier: makeIdentifier(
                                                        sanitizedLabel,
                                                    ),
                                                });
                                            }}
                                            onIdentifierChange={(
                                                updatedIdentifier: string,
                                            ) => {
                                                props.onChange({
                                                    ...relationInput,
                                                    identifier: updatedIdentifier,
                                                });
                                            }}
                                            onRequiredChange={(
                                                updatedRequired: boolean,
                                            ) => {
                                                props.onChange({
                                                    ...relationInput,
                                                    required: updatedRequired,
                                                });
                                            }}
                                            onUniqueChange={(
                                                updatedUnique: boolean,
                                            ) => {
                                                props.onChange({
                                                    ...relationInput,
                                                    unique: updatedUnique,
                                                });
                                            }}
                                        />
                                    );
                                }

                                return (
                                    <RelationMetaForm
                                        description={relationInput.description}
                                        onDescriptionChange={(
                                            updatedDescription: string,
                                        ) => {
                                            props.onChange({
                                                ...relationInput,
                                                description: updatedDescription,
                                            });
                                        }}
                                    />
                                );
                            }}
                        </RelationFormSelector>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
