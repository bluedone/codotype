import { Relation, RelationTypes } from "@codotype/core";
import * as React from "react";
import { RelationDiagram } from "./RelationDiagram";

// // // //

export interface RelationBadgeProps {
    direction: "in" | "out";
    relation: Relation;
    slim: boolean;
}

export function RelationBadge(props: RelationBadgeProps) {
    const { slim = false, direction, relation } = props;
    const { identifiers } = relation;

    return (
        <React.Fragment>
            {relation.type === RelationTypes.BELONGS_TO && (
                <RelationDiagram
                    direction={direction}
                    sourcePlural={true}
                    sourceLabel={identifiers.source.canonical.plural.title}
                    sourceAlias={identifiers.source.alias.plural.title}
                    destPlural={false}
                    destLabel={identifiers.destination.canonical.singular.title}
                    destAlias={identifiers.destination.alias.singular.title}
                    slim={slim}
                />
            )}

            {relation.type === RelationTypes.HAS_ONE ||
                (relation.type === RelationTypes.TO_ONE && (
                    <RelationDiagram
                        direction={direction}
                        sourcePlural={false}
                        sourceLabel={
                            identifiers.source.canonical.singular.title
                        }
                        sourceAlias={identifiers.source.alias.singular.title}
                        destPlural={false}
                        destLabel={
                            identifiers.destination.canonical.singular.title
                        }
                        destAlias={identifiers.destination.alias.singular.title}
                        slim={slim}
                    />
                ))}

            {relation.type === RelationTypes.HAS_MANY ||
                (relation.type === RelationTypes.TO_MANY && (
                    <RelationDiagram
                        direction={direction}
                        sourcePlural={false}
                        sourceLabel={
                            identifiers.source.canonical.singular.title
                        }
                        sourceAlias={identifiers.source.alias.singular.title}
                        destPlural={true}
                        destLabel={
                            identifiers.destination.canonical.plural.title
                        }
                        destAlias={identifiers.destination.alias.plural.title}
                        slim={slim}
                    />
                ))}

            {relation.type === RelationTypes.HAS_AND_BELONGS_TO_MANY && (
                <RelationDiagram
                    direction={direction}
                    sourcePlural={true}
                    sourceLabel={identifiers.source.canonical.singular.title}
                    sourceAlias={identifiers.source.alias.plural.title}
                    destPlural={true}
                    destLabel={identifiers.destination.canonical.plural.title}
                    destAlias={identifiers.destination.alias.plural.title}
                    slim={slim}
                />
            )}
        </React.Fragment>
    );
}
