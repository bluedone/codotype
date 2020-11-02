import * as React from "react";
import { storiesOf } from "@storybook/react";
import { RelationPropertiesForm } from "../RelationPropertiesForm";
import { Story } from "../../dev";
import { testState, RelationInput, RelationTypes, CreatedByValues } from "@codotype/core";
const { userSchema, movieSchema } = testState;

// // // //

const testCases: [string, RelationInput][] = [
    [
        "renders",
        {
            id: "test-01",
            internalNote: "",
            type: RelationTypes.TO_ONE,
            createdBy: CreatedByValues.user,
            locked: false,
            sourceSchemaID: userSchema.id,
            destinationSchemaID: userSchema.id,
            sourceSchemaAlias: "Directed Movie",
            destinationSchemaAlias: "Director",
            addons: {}
        },
    ],
];

const storyCollection = storiesOf(
    "ProjectEditor/RelationEditor/RelationPropertiesForm",
    module,
);
testCases.forEach(testCase => {
    storyCollection.add(testCase[0], () => {
        const [relationInput, setRelationInput] = React.useState(testCase[1]);
        return (
            <Story>
                <div className="row">
                    <div className="col-sm-12">
                        <div className="card card-body mb-3">
                            <div className="row">
                                <div className="col-sm-12">
                                    <RelationPropertiesForm
                                        schema={movieSchema}
                                        schemas={[userSchema, movieSchema]}
                                        relationInput={relationInput}
                                        onChange={setRelationInput}
                                        supportedRelationTypes={[
                                            RelationTypes.BELONGS_TO,
                                            RelationTypes.HAS_AND_BELONGS_TO_MANY,
                                            RelationTypes.HAS_MANY,
                                            RelationTypes.HAS_ONE,
                                            RelationTypes.TO_ONE,
                                            RelationTypes.TO_MANY,
                                        ]}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </Story>
        );
    });
});
