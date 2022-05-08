import * as React from "react";
import {
    PropertyTypes,
    PropertyLayoutVariant,
    ConfigurationProperty,
    PropertyLayoutVariants,
} from "@codotype/core";
import classnames from "classnames";
import { DocumentationModal } from "../DocumentationModal";

// // // //
const col_12_variants: PropertyLayoutVariant[] = [
    PropertyLayoutVariants.CARD_COL_12,
    PropertyLayoutVariants.COL_12,
];

const col_8_variants: PropertyLayoutVariant[] = [
    PropertyLayoutVariants.CARD_COL_8,
    PropertyLayoutVariants.COL_8,
];

const col_6_variants: PropertyLayoutVariant[] = [
    PropertyLayoutVariants.CARD_COL_6,
    PropertyLayoutVariants.COL_6,
];

const col_4_variants: PropertyLayoutVariant[] = [
    PropertyLayoutVariants.CARD_COL_4,
    PropertyLayoutVariants.COL_4,
];

const col_3_variants: PropertyLayoutVariant[] = [
    PropertyLayoutVariants.CARD_COL_3,
    PropertyLayoutVariants.COL_3,
];

/**
 * Gets the column span for a specific PropertyLayoutVariants
 * @param layoutVariant
 */
function getColSpan(layoutVariant: PropertyLayoutVariant): number {
    if (col_12_variants.includes(layoutVariant)) {
        return 12;
    }
    if (col_8_variants.includes(layoutVariant)) {
        return 8;
    }
    if (col_6_variants.includes(layoutVariant)) {
        return 6;
    }
    if (col_4_variants.includes(layoutVariant)) {
        return 4;
    }
    if (col_3_variants.includes(layoutVariant)) {
        return 3;
    }
    return 12; // Default
}

// // // //

interface ConfigurationInputFormGroupProps {
    property: ConfigurationProperty;
    className?: string;
    enabled?: boolean;
    onChangeEnabled?: (updatedEnabled: boolean) => void;
    children: React.ReactNode;
}

export function ConfigurationInputFormGroup(
    props: ConfigurationInputFormGroupProps,
) {
    const { property, className = "" } = props;
    const { enabled = property.enabledByDefault } = props;

    const renderDocumentationModal: boolean =
        property.content.documentation !== "";

    const { layoutVariant } = property;

    // Handle rendering the property inside a card
    const cardVariants: PropertyLayoutVariant[] = [
        PropertyLayoutVariants.CARD_COL_3,
        PropertyLayoutVariants.CARD_COL_4,
        PropertyLayoutVariants.CARD_COL_6,
        PropertyLayoutVariants.CARD_COL_8,
        PropertyLayoutVariants.CARD_COL_12,
    ];
    const renderInCard: boolean = cardVariants.includes(layoutVariant);

    // Handle column span
    const colSpan: number = getColSpan(layoutVariant);

    // Handle ConfigurationProperty
    const isInstanceProperty = property.type === PropertyTypes.INSTANCE;

    // Defines checkbox to enable/disable
    const toggleEnabledCheckbox = (
        <input
            type="checkbox"
            checked={enabled}
            onChange={e => {
                if (props.onChangeEnabled) {
                    props.onChangeEnabled(e.currentTarget.checked);
                }
            }}
        />
    );

    // Build FormGroupHeader styles
    const formGroupHeader = (
        <div className="flex items-center">
            {property.content.icon && (
                <img
                    src={property.content.icon}
                    className="mr-3 max-h-8 rounded-sm"
                    draggable={false}
                />
            )}
            <label
                className={classnames("mb-0 text-lg font-medium", {
                    "text-lg": !isInstanceProperty,
                    "text-xl": isInstanceProperty,
                })}
            >
                {property.content.label}
            </label>
            {renderDocumentationModal && (
                <small className="mx-3">
                    <DocumentationModal
                        header={property.content.label}
                        documentation={property.content.documentation}
                    />
                </small>
            )}
        </div>
    );

    const formGroupDescription = (
        <React.Fragment>
            {/* Render description IFF not empty */}
            {property.content.description !== "" && (
                <p className="text-muted font-light mt-2">
                    {property.content.description}
                </p>
            )}

            {/* Render empty description warning */}
            {property.content.description === "" && (
                <p className="text-red-500 font-light mt-2">
                    Warning - this input needs a description
                </p>
            )}
        </React.Fragment>
    );

    const formGroup = (
        <div
            className={classnames("select-none", {
                [className]: className !== "",
            })}
        >
            <div className="flex items-center">
                <div className="flex items-center justify-between w-full">
                    {formGroupHeader}
                    {property.type === PropertyTypes.BOOLEAN && (
                        <div
                            className={classnames("flex items-center", {
                                "ml-3": !renderDocumentationModal,
                            })}
                        >
                            {props.children}
                        </div>
                    )}
                </div>

                {/* Render toggleEnabledCheckbox */}
                {property.allowDisable && toggleEnabledCheckbox}
            </div>

            {formGroupDescription}

            {/* Renders props.children */}
            {property.type !== PropertyTypes.BOOLEAN && (
                <div className="mt-3">{props.children}</div>
            )}
        </div>
    );

    const disabledFormGroup = (
        <div
            className={classnames({
                [className]: className !== "",
            })}
        >
            <div className="flex items-center justify-between">
                <div className="flex items-center">{formGroupHeader}</div>
            </div>

            {formGroupDescription}

            {/* Renders message to turn this feature on */}
            <div className="mt-3 px-3 py-3 flex justify-center bg-gray-800 text-white rounded">
                <div className="flex flex-col items-center">
                    <p className="lead mb-0">Enable {property.content.label}</p>
                    <p className="mb-0">
                        Click to enable the {property.content.label} property.
                    </p>
                    <span className="mt-3">{toggleEnabledCheckbox}</span>
                </div>
            </div>
        </div>
    );

    // Handle property.allowDisable
    if (property.allowDisable && !enabled && !renderInCard) {
        return (
            <div className={`sm:col-span-12 md:col-span-${colSpan}`}>
                {disabledFormGroup}
            </div>
        );
    }
    if (property.allowDisable && !enabled && renderInCard) {
        return (
            <div className={`sm:col-span-12 md:col-span-${colSpan}`}>
                <div className="card rounded-lg shadow-sm py-3 px-3">
                    {disabledFormGroup}
                </div>
            </div>
        );
    }

    // Return standard if NOT renderInCard
    if (!renderInCard) {
        return (
            <div className={`sm:col-span-12 md:col-span-${colSpan}`}>
                <div className="py-3">{formGroup}</div>
            </div>
        );
    }

    // Handle renderInCard
    return (
        <div className={`sm:col-span-12 md:col-span-${colSpan}`}>
            <div className="card card-body rounded-lg shadow-sm py-3 px-3">
                {formGroup}
            </div>
        </div>
    );
}
