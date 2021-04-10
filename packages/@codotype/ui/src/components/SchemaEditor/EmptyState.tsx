import * as React from "react";
import { SchemaForm } from "./SchemaForm";

// // // //

/**
 * EmptyState
 */
export function EmptyState(props: {
    disabled: boolean;
    onNewTokenChange: (updatedTokens: any) => void;
    onKeydownEnter: () => void;
    onSubmit: () => void;
}) {
    const { disabled, onNewTokenChange, onKeydownEnter, onSubmit } = props;
    return (
        <div className="flex py-4 justify-center items-center">
            <div className="col-sm-8">
                <div className="card card-body shadow-xl">
                    <div className="row items-center justify-center">
                        <div className="col-lg-12">
                            <h4 className="mb-0 text-2xl flex">
                                New Data Model
                            </h4>

                            <SchemaForm
                                label={""}
                                onChange={updatedTokens => {
                                    onNewTokenChange(updatedTokens);
                                }}
                                onKeydownEnter={() => {
                                    onKeydownEnter();
                                }}
                            />
                        </div>
                    </div>
                    <div className="col-lg-12 text-right mt-2">
                        <button
                            className="btn btn-lg btn-primary"
                            disabled={disabled}
                            onClick={() => {
                                onSubmit();
                            }}
                        >
                            Create Schema
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}
