import * as React from "react";
import { RELATION_META, RelationType, RelationMeta } from "@codotype/types";
import classname from "classnames";

// // // //

const REL_TYPE_ICON_ROOT_URL =
    "https://res.cloudinary.com/codotype/image/upload/v1551448517/codotype-icons/";

interface DatatypeOptionProps {
    relationMeta: RelationMeta;
}
export function DatatypeOption(props: DatatypeOptionProps) {
    return (
        <button value={props.relationMeta.id}>
            {props.relationMeta.label}
        </button>
    );
}

/**
 * RelationDatatypeFormProps
 * TODO - annotate remaining props
 */
interface RelationDatatypeFormProps {
    type: RelationType;
    supportedRelationTypes: RelationType[];
    onChangeRelationType: (updatedDatatype: RelationType) => void;
}

/**
 * RelationDatatypeForm
 * @param props - see `RelationDatatypeFormProps`
 */
export function RelationDatatypeForm({
    type,
    supportedRelationTypes,
    onChangeRelationType,
}: RelationDatatypeFormProps) {
    const filteredRelationKeys = Object.keys(
        RELATION_META,
    ).filter((relType: string) =>
        supportedRelationTypes.map(d => String(d)).includes(relType),
    );

    /** Choose either active or normal image for rel type. */
    const imgSrc = (relType: string) =>
        `${REL_TYPE_ICON_ROOT_URL}/${relType.toLowerCase()}${
            relType === String(type) ? "_active.png" : ".png"
        }`;

    /** Create a button for a rel type that respects which one is active. */
    const makeRelTypeButton = (relType: string) => {
        // @ts-ignore
        const relationMeta: RelationMeta = RELATION_META[relType];

        return (
            <button
                key={relationMeta.id}
                style={{ width: "33%" }}
                className={classname("btn btn-outline-primary", {
                    active: relType === type,
                })}
                title={relationMeta.label}
                onClick={() => onChangeRelationType(relationMeta.id)}
            >
                <img style={{ width: "60%" }} src={imgSrc(relType)} />
            </button>
        );
    };

    return (
        <div className="btn-group w-100">
            {filteredRelationKeys.map(makeRelTypeButton)}
        </div>
    );
}
