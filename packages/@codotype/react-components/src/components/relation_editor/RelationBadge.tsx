import { RelationReference, Schema, RelationType } from "@codotype/types";
import * as React from "react";
import { RelationDiagram } from "./RelationDiagram";

// // // //

export interface RelationBadgeProps {
    direction: "in" | "out";
    relation: RelationReference;
    slim: boolean;
}

export function RelationBadge(props: RelationBadgeProps) {
    const { slim = false, direction, relation } = props;
    const { identifiers } = relation;

    return (
        <React.Fragment>
            {relation.type === RelationType.BELONGS_TO && (
                <RelationDiagram
                    direction={direction}
                    sourcePlural={true}
                    sourceLabel={identifiers.source.canonical.plural.label}
                    sourceAlias={identifiers.source.alias.plural.label}
                    destPlural={false}
                    destLabel={identifiers.destination.canonical.singular.label}
                    destAlias={identifiers.destination.alias.singular.label}
                    slim={slim}
                />
            )}

            {relation.type === RelationType.HAS_ONE ||
                (relation.type === RelationType.TO_ONE && (
                    <RelationDiagram
                        direction={direction}
                        sourcePlural={false}
                        sourceLabel={
                            identifiers.source.canonical.singular.label
                        }
                        sourceAlias={identifiers.source.alias.singular.label}
                        destPlural={false}
                        destLabel={
                            identifiers.destination.canonical.singular.label
                        }
                        destAlias={identifiers.destination.alias.singular.label}
                        slim={slim}
                    />
                ))}

            {relation.type === RelationType.HAS_MANY && (
                <RelationDiagram
                    direction={direction}
                    sourcePlural={false}
                    sourceLabel={identifiers.source.canonical.singular.label}
                    sourceAlias={identifiers.destination.alias.singular.label}
                    destPlural={true}
                    destLabel={identifiers.destination.canonical.plural.label}
                    destAlias={identifiers.destination.alias.plural.label}
                    slim={slim}
                />
            )}

            {relation.type === RelationType.HAS_AND_BELONGS_TO_MANY && (
                <RelationDiagram
                    direction={direction}
                    sourcePlural={true}
                    sourceLabel={identifiers.source.canonical.singular.label}
                    sourceAlias={identifiers.destination.alias.plural.label}
                    destPlural={true}
                    destLabel={identifiers.destination.canonical.plural.label}
                    destAlias={identifiers.destination.alias.plural.label}
                    slim={slim}
                />
            )}
        </React.Fragment>
    );
}
