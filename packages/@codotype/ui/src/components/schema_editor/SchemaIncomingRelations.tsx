import * as React from "react";
import { InflatedSchema } from "@codotype/types";
import { RelationBadge } from "../relation_editor/RelationBadge";
import { InfoTooltip } from "../info_tooltip";

// // // //

interface SchemaIncomingRelationsProps {
    inflatedSchema: InflatedSchema;
}

/**
 * SchemaIncomingRelations
 * @param props - see `SchemaIncomingRelationsProps`
 */
export function SchemaIncomingRelations(props: SchemaIncomingRelationsProps) {
    const { inflatedSchema } = props;

    return (
        <div className="row mt-3">
            <div className="col-lg-12">
                <p className="mb-0 text-muted">
                    <span className="d-flex align-items-center justify-content-between mb-1">
                        <strong className="m-0">Incoming Relations</strong>
                        <InfoTooltip
                            id="schema-incoming-relations"
                            placement="left"
                            message={`Relations which reference the ${inflatedSchema.identifiers.singular.label} Schema`}
                        />
                    </span>
                </p>
            </div>
            <div className="col-lg-12">
                <ul className="list-group">
                    {inflatedSchema.references.length === 0 && (
                        <li className="list-group-item">
                            <strong className="mb-0 mt-1 text-muted">
                                No Incoming Relations
                            </strong>
                            <br />
                            <small className="text-muted">
                                Relations which reference the{" "}
                                {inflatedSchema.identifiers.singular.label}{" "}
                                Schema
                            </small>
                        </li>
                    )}
                    {inflatedSchema.references.map(r => {
                        return (
                            <li
                                className="list-group-item py-0 px-2"
                                key={r.id}
                            >
                                <small>
                                    <RelationBadge
                                        slim
                                        direction="in"
                                        relation={r}
                                    />
                                </small>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
