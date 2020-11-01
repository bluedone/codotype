import * as React from "react";
import {
    OptionType,
    ConfigurationGroupProperty,
    PropertyLayoutVariant,
} from "@codotype/core";
import classnames from "classnames";
import { DocumentationModal } from "../DocumentationModal";

// // // //

/**
 * Gets the column span for a specific PropertyLayoutVariant
 * @param layoutVariant
 */
function getColSpan(layoutVariant: PropertyLayoutVariant): number {
    if (
        [
            PropertyLayoutVariant.CARD_COL_12,
            PropertyLayoutVariant.COL_12,
        ].includes(layoutVariant)
    ) {
        return 12;
    }
    if (
        [
            PropertyLayoutVariant.CARD_COL_8,
            PropertyLayoutVariant.COL_8,
        ].includes(layoutVariant)
    ) {
        return 8;
    }
    if (
        [
            PropertyLayoutVariant.CARD_COL_6,
            PropertyLayoutVariant.COL_6,
        ].includes(layoutVariant)
    ) {
        return 6;
    }
    if (
        [
            PropertyLayoutVariant.CARD_COL_4,
            PropertyLayoutVariant.COL_4,
        ].includes(layoutVariant)
    ) {
        return 4;
    }
    if (
        [
            PropertyLayoutVariant.CARD_COL_3,
            PropertyLayoutVariant.COL_3,
        ].includes(layoutVariant)
    ) {
        return 3;
    }
    return 12; // Default
}

// // // //

interface ConfigurationInputFormGroupProps {
    property: ConfigurationGroupProperty;
    className?: string;
    enabled?: boolean;
    onChangeEnabled?: (updatedEnabled: boolean) => void;
    children: React.ReactNode;
}

export function ConfigurationInputFormGroup(
    props: ConfigurationInputFormGroupProps,
) {
    const { property, className = "" } = props;
    const { enabled = property.enabled } = props;

    const renderDocumentationModal: boolean = property.documentation !== "";

    const { layoutVariant = PropertyLayoutVariant.CARD_COL_12 } = property;

    // Handle rendering the property inside a card
    const renderInCard: boolean = [
        PropertyLayoutVariant.CARD_COL_3,
        PropertyLayoutVariant.CARD_COL_4,
        PropertyLayoutVariant.CARD_COL_6,
        PropertyLayoutVariant.CARD_COL_8,
        PropertyLayoutVariant.CARD_COL_12,
    ].includes(layoutVariant);

    // Handle column span
    const colSpan: number = getColSpan(layoutVariant);

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

    const formGroupHeader = (
        <div className="d-flex align-items-center">
            {property.icon && (
                <img
                    src={property.icon}
                    style={{ maxWidth: "2rem" }}
                    className="mr-2"
                />
            )}
            <label className="mb-0">{property.label}</label>
            {renderDocumentationModal && (
                <small className="mx-3">
                    <DocumentationModal
                        header={property.label}
                        documentation={property.description} // TODO - update this to use property.documentation
                    />
                </small>
            )}
        </div>
    );

    const formGroupDescription = (
        <React.Fragment>
            {/* Render description IFF not empty */}
            {property.description !== "" && (
                <small className="d-block mt-2 text-muted">
                    {property.description}
                </small>
            )}

            {/* Render empty description warning */}
            {property.description === "" && (
                <small className="d-block mt-2 mb-2 text-danger">
                    Warning - this input needs a description
                </small>
            )}
        </React.Fragment>
    );

    const formGroup = (
        <div
            className={classnames("form-group", {
                [className]: className !== "",
            })}
        >
            <div className="d-flex align-items-center justify-content-between">
                {/* TODO - replace this with modified ConfigurationGroupHeader? */}
                <div className="d-flex align-items-center">
                    {formGroupHeader}
                    {property.type === OptionType.BOOLEAN && (
                        <div
                            className={classnames("d-flex align-items-center", {
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
            {property.type !== OptionType.BOOLEAN && (
                <React.Fragment>{props.children}</React.Fragment>
            )}
        </div>
    );

    const disabledFormGroup = (
        <div
            className={classnames("form-group", {
                [className]: className !== "",
            })}
        >
            <div className="d-flex align-items-center justify-content-between">
                {/* TODO - replace this with modified ConfigurationGroupHeader? */}
                <div className="d-flex align-items-center">
                    {formGroupHeader}
                </div>
            </div>

            {formGroupDescription}

            {/* Renders message to turn this feature on */}
            <div className="mt-2 px-2 py-2 d-flex justify-content-center bg-dark text-white rounded">
                <div className="d-flex flex-column align-items-center">
                    <p className="lead mb-0">Enable {property.label}</p>
                    <p className="mb-0">
                        Click to enable the {property.label} property.
                    </p>
                    <span className="mt-2">{toggleEnabledCheckbox}</span>
                </div>
            </div>
        </div>
    );

    // Handle property.allowDisable
    if (property.allowDisable && !enabled && !renderInCard) {
        return <div className={`col-lg-${colSpan}`}>{disabledFormGroup}</div>;
    }
    if (property.allowDisable && !enabled && renderInCard) {
        return (
            <div className={`col-lg-${colSpan}`}>
                <div className="card shadow-sm my-2 py-3 px-3">
                    {disabledFormGroup}
                </div>
            </div>
        );
    }

    // Return standard if NOT renderInCard
    if (!renderInCard) {
        return <div className={`col-lg-${colSpan}`}>{formGroup}</div>;
    }

    // Handle renderInCard
    return (
        <div className={`col-lg-${colSpan}`}>
            <div className="card shadow-sm my-2 py-3 px-3">{formGroup}</div>
        </div>
    );
}
