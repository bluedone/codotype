import React, { FunctionComponent } from "react";
import {
    OptionType,
    OptionValue,
    OptionValueInstance,
    ConfigurationGroupProperty,
} from "@codotype/types";
import { ConfigurationInputChild } from "./ConfigurationInputChild";
import { ConfigurationInputFormGroup } from "./ConfigurationInputFormGroup";

// // // //

interface ConfigurationInstanceInputProps {
    properties: ConfigurationGroupProperty[];
    label: string;
    card?: boolean;
    value: OptionValueInstance;
    onChange: (updatedVal: OptionValueInstance) => void;
}
export const ConfigurationInstanceInput: FunctionComponent<ConfigurationInstanceInputProps> = (
    props: ConfigurationInstanceInputProps,
) => {
    return (
        <div className="row">
            <div className="col-lg-12">
                <p className="lead mb-0">{props.label}</p>
                <div className="row">
                    {props.properties.map(
                        (property: ConfigurationGroupProperty) => {
                            // if (property.type === OptionType.COLLECTION) {
                            //     return (
                            //         <div className="card card-body mb-4">
                            //             <ConfigurationInstanceInput
                            //                 label={property.label}
                            //                 properties={property.properties}
                            //                 onChange={(
                            //                     updatedVal: OptionValue,
                            //                 ) => {
                            //                     props.onChange({
                            //                         // ...props.value,
                            //                         [property.identifier]: updatedVal,
                            //                     });
                            //                 }}
                            //                 value={props.value}
                            //             />
                            //         </div>
                            //     );
                            // }

                            if (property.type === OptionType.INSTANCE) {
                                return (
                                    <div className="card card-body mb-4">
                                        <ConfigurationInstanceInput
                                            card={false}
                                            label={property.label}
                                            properties={property.properties}
                                            onChange={(
                                                updatedVal: OptionValue,
                                            ) => {
                                                props.onChange({
                                                    // @ts-ignore
                                                    ...props.value.value,
                                                    [property.identifier]: {
                                                        enabled: true,
                                                        value: updatedVal,
                                                    },
                                                    // ...updatedVal,
                                                });
                                            }}
                                            value={
                                                // @ts-ignore
                                                props.value.value[
                                                    property.identifier
                                                ]
                                            }
                                        />
                                        {/* {JSON.stringify(
                                            // @ts-ignore
                                            props.value.value[
                                                property.identifier
                                            ].value,
                                            null,
                                            4,
                                        )} */}
                                    </div>
                                );
                            }

                            // TODO - handle nested instance + collection
                            return (
                                <ConfigurationInputFormGroup
                                    card={props.card}
                                    property={property}
                                >
                                    <ConfigurationInputChild
                                        value={null}
                                        property={property}
                                        onChange={(
                                            updatedValue: OptionValue,
                                        ) => {
                                            props.onChange({
                                                // @ts-ignore
                                                ...props.value.value,
                                                [property.identifier]: updatedValue,
                                            });
                                        }}
                                    />
                                    <pre>
                                        {/* TODO - render with DEBUG flag */}
                                        {/* {JSON.stringify(props.value, null, 4)} */}
                                    </pre>
                                </ConfigurationInputFormGroup>
                            );
                        },
                    )}
                    {/* <pre>{JSON.stringify(props.configurationGroup, null, 4)}</pre> */}
                </div>
            </div>
        </div>
    );
};
