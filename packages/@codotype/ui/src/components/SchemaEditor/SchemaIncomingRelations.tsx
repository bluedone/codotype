import * as React from "react";
import { Schema, UUID } from "@codotype/core";
import { RelationBadge } from "../RelationEditor/RelationBadge";
import { InfoTooltip } from "../InfoTooltip";
import { Tooltip } from "../Tooltip";

// // // //

interface SchemaIncomingRelationsProps {
    inflatedSchema: Schema;
    onSelectSchema: (nextSelectedSchemaId: UUID) => void;
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
                    <span className="flex items-center justify-between mb-1">
                        <strong className="m-0">Incoming Relations</strong>
                        <InfoTooltip
                            id="schema-incoming-relations"
                            placement="left"
                            message={`Relations which reference the ${inflatedSchema.identifiers.singular.title} Schema`}
                        />
                    </span>
                </p>
            </div>
            <div className="col-lg-12">
                <ul className="flex flex-col pl-0 mb-0 rounded">
                    {inflatedSchema.referencedBy.length === 0 && (
                        <li className="list-group-item">
                            <strong className="mb-0 mt-1 text-muted">
                                No Incoming Relations
                            </strong>
                            <br />
                            <p className="text-muted mb-0">
                                Relations which reference the{" "}
                                {inflatedSchema.identifiers.singular.title}{" "}
                                Schema
                            </p>
                        </li>
                    )}
                    {inflatedSchema.referencedBy.map(r => {
                        return (
                            <li
                                className="list-group-item px-2 border border-gray-500"
                                style={{ cursor: "pointer" }}
                                key={r.id}
                                onClick={() => {
                                    props.onSelectSchema(r.sourceSchemaID);
                                }}
                            >
                                <Tooltip
                                    key={r.id}
                                    position="left"
                                    tooltipContent={
                                        <>
                                            {'Jump to "' +
                                                r.identifiers.source.canonical
                                                    .singular.title +
                                                '" schema'}
                                        </>
                                    }
                                >
                                    <RelationBadge
                                        slim
                                        direction="in"
                                        relation={r}
                                    />
                                </Tooltip>
                            </li>
                        );
                    })}
                </ul>
            </div>
        </div>
    );
}
