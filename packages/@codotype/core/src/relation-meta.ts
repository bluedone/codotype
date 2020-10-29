import { RelationType, RelationTypes } from "./relation";

// // // //

export interface RelationMeta {
    id: RelationType;
    label: string;
    description: string;
}

// Defines RelationType metadata
export const RELATION_META: {
    [key in RelationTypes]: RelationMeta;
} = {
    [RelationTypes.BELONGS_TO]: {
        id: RelationTypes.BELONGS_TO,
        label: "Belongs To",
        description: "Many belong to One",
    },
    [RelationTypes.HAS_ONE]: {
        id: RelationTypes.HAS_ONE,
        label: "Has One",
        description: "One references One",
    },
    [RelationTypes.HAS_MANY]: {
        id: RelationTypes.HAS_MANY,
        label: "Has Many",
        description: "One references Many",
    },
    [RelationTypes.HAS_AND_BELONGS_TO_MANY]: {
        id: RelationTypes.HAS_AND_BELONGS_TO_MANY,
        label: "Has and Belongs To Many",
        description: "Many reference Many",
    },
    [RelationTypes.TO_ONE]: {
        id: RelationTypes.TO_ONE,
        label: "To One",
        description: "One reference one",
    },
    [RelationTypes.TO_MANY]: {
        id: RelationTypes.TO_MANY,
        label: "To Many",
        description: "One references Many",
    },
    [RelationTypes.EMBEDS_ONE]: {
        id: RelationTypes.EMBEDS_ONE,
        label: "Embeds One",
        description: "One embeds one",
    },
    [RelationTypes.EMBEDS_MANY]: {
        id: RelationTypes.TO_MANY,
        label: "Embeds Many",
        description: "One embeds Many",
    },
};
