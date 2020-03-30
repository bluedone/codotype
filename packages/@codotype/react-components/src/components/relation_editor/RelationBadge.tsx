import { Relation, Schema } from "../types";
import * as React from "react";
import { RelationDiagram } from "./RelationDiagram";
// import { inflateRelation } from "@codotype/util";

// // // //

export interface RelationBadgeProps {
    direction: "in" | "out";
    relation: Relation;
    slim: boolean;
    selectedSchema: Schema;
    schemas: Schema[];
}

export function RelationBadge(props: RelationBadgeProps) {
    const { slim = false, direction, selectedSchema, relation } = props;

    // const model = inflateRelation({
    //     relation: relation,
    //     schemas: schemas,
    // });

    const model = {
        type: "RELATION_TYPE_BELONGS_TO",
    };

    return (
        <React.Fragment>
            {model.type === "RELATION_TYPE_BELONGS_TO" && (
                <RelationDiagram
                    direction={"direction"}
                    sourcePlural={true}
                    sourceLabel={selectedSchema.tokens.label_plural}
                    sourceAlias={"inflated.reverse_alias.label_plural"}
                    destPlural={false}
                    destLabel={"inflated.schema.label"}
                    destAlias={"inflated.alias.label"}
                    slim={props.slim}
                />
            )}

            {model.type === "RELATION_TYPE_HAS_ONE" && (
                <RelationDiagram
                    direction={"direction"}
                    sourcePlural={false}
                    sourceLabel={selectedSchema.tokens.label}
                    sourceAlias={"inflated.reverse_alias.label"}
                    destPlural={false}
                    destLabel={"inflated.schema.label"}
                    destAlias={"inflated.alias.label"}
                    slim={props.slim}
                />
            )}

            {model.type === "RELATION_TYPE_HAS_AND_BELONGS_TO_MANY" && (
                <RelationDiagram
                    direction={"direction"}
                    sourcePlural={false}
                    sourceLabel={selectedSchema.tokens.label}
                    sourceAlias={"inflated.reverse_alias.label"}
                    destPlural={true}
                    destLabel={"inflated.schema.label_plural"}
                    destAlias={"inflated.alias.label_plural"}
                    slim={props.slim}
                />
            )}

            {model.type === "RELATION_TYPE_HAS_AND_BELONGS_TO_MANY" && (
                <RelationDiagram
                    direction={"direction"}
                    sourcePlural={true}
                    sourceLabel={selectedSchema.tokens.label_plural}
                    sourceAlias={"inflated.reverse_alias.label_plural"}
                    destPlural={true}
                    destLabel={"inflated.schema.label_plural"}
                    destAlias={"inflated.alias.label_plural"}
                    slim={props.slim}
                />
            )}
        </React.Fragment>
    );
}
