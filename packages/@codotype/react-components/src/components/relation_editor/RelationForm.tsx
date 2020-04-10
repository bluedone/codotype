import { RelationDatatypeForm } from "./RelationDatatypeForm";
import { Relation, RelationType } from "@codotype/types";
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
        relationInput.type === null ? "DATATYPE" : "PROPERTIES";

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
                        disabled={relationInput.type === null}
                        active={selectedForm === "DATATYPE"}
                        label={"Datatype"}
                    />

                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("PROPERTIES");
                        }}
                        disabled={relationInput.type === null}
                        active={selectedForm === "PROPERTIES"}
                        label={"Properties"}
                    />

                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("DESCRIPTION");
                        }}
                        disabled={relationInput.type === null}
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
 * `supportedRelationTypes` - the unique IDs of supported datatypes made available in the form
 */
interface RelationFormProps {
    relations: Relation[];
    relationInput: RelationInput;
    supportedRelationTypes: RelationType[];
    onChange: (updatedRelationInput: RelationInput) => void;
}

/**
 * RelationForm
 * @param props - see `RelationFormProps`
 */
export function RelationForm(props: RelationFormProps) {
    const { relationInput, supportedRelationTypes } = props;

    return (
        <div className="row">
            <div className="col-lg-12">
                {/* {!relationInput.datatype && (
                    <RelationDatatypeForm
                        datatype={relationInput.datatype}
                        supportedRelationTypes={supportedRelationTypes}
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
                                            type={relationInput.type}
                                            supportedRelationTypes={
                                                supportedRelationTypes
                                            }
                                            onChangeRelationType={(
                                                updatedRelationType: RelationType,
                                            ) => {
                                                props.onChange({
                                                    ...relationInput,
                                                    type: updatedRelationType,
                                                });
                                                setSelectedForm("PROPERTIES");
                                            }}
                                        />
                                    );
                                }

                                if (selectedForm === "PROPERTIES") {
                                    return <p>RelationPropertiesForm Here</p>;
                                }

                                return <p>Meta Form Here</p>;
                            }}
                        </RelationFormSelector>
                    </React.Fragment>
                )}
            </div>
        </div>
    );
}
