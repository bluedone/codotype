import { RelationType } from "./relation";

// export const RELATION_META = {};

// // // //

export interface RelationMeta {
    id: RelationType;
    label: string;
    description: string;
    // value: RelationType;
}

// Defines RelationType metadata
export const RELATION_META: {
    [key in RelationType]: RelationMeta;
} = {
    [RelationType.BELONGS_TO]: {
        id: RelationType.BELONGS_TO,
        label: "Belongs To",
        description: "Many reference One",
    },
    [RelationType.HAS_ONE]: {
        id: RelationType.HAS_ONE,
        label: "Has One",
        description: "One references One",
    },
    [RelationType.HAS_MANY]: {
        id: RelationType.HAS_MANY,
        label: "Has Many",
        description: "One references Many",
    },
    [RelationType.HAS_AND_BELONGS_TO_MANY]: {
        id: RelationType.HAS_AND_BELONGS_TO_MANY,
        label: "Has and Belongs To Many",
        description: "Many reference Many",
    },
    [RelationType.TO_ONE]: {
        id: RelationType.TO_ONE,
        label: "To One",
        description: "One reference one",
    },
    [RelationType.TO_MANY]: {
        id: RelationType.TO_MANY,
        label: "To Many",
        description: "One references Many",
    },
};
