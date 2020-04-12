import { RelationDatatypeForm } from "./RelationDatatypeForm";
import { RelationPropertiesForm } from "./RelationPropertiesForm";
import { Relation, RelationType, Schema } from "@codotype/types";
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
        relationInput.type === null ? "PROPERTIES" : "PROPERTIES";

    const [selectedForm, setSelectedForm] = React.useState<string>(
        defaultSelectedForm,
    );

    return (
        <div className="row">
            <div className="col-lg-12">
                <ul className="nav nav-tabs w-100 d-flex">
                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("PROPERTIES");
                        }}
                        disabled={false}
                        active={selectedForm === "PROPERTIES"}
                        label={"Properties"}
                    />

                    <FormGroupTab
                        onClick={() => {
                            setSelectedForm("DESCRIPTION");
                        }}
                        disabled={false}
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
    selectedSchema: Schema;
    schema: Schema;
    schemas: Schema[];
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
                <RelationFormSelector relationInput={relationInput}>
                    {({ selectedForm, setSelectedForm }) => {
                        if (selectedForm === "PROPERTIES") {
                            return (
                                <RelationPropertiesForm
                                    relationInput={props.relationInput}
                                    supportedRelationTypes={
                                        props.supportedRelationTypes
                                    }
                                    schema={props.schema}
                                    schemas={props.schemas}
                                    onChange={(
                                        updatedRelationInput: RelationInput,
                                    ) => {
                                        console.log(
                                            "onChange relation properties",
                                        );
                                        console.log({
                                            ...relationInput,
                                            ...updatedRelationInput,
                                        });
                                        props.onChange({
                                            ...relationInput,
                                            ...updatedRelationInput,
                                        });
                                        setSelectedForm("PROPERTIES");
                                    }}
                                />
                            );
                        }

                        return <p>Meta Form Here</p>;
                    }}
                </RelationFormSelector>
            </div>
        </div>
    );
}
