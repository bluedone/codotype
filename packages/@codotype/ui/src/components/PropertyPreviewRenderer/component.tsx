import * as React from "react";
import {
    applyPropertyPreview,
    PropertyPreview,
    PropertyPreviewLayoutVariant,
} from "@codotype/core";

// // // //

/**
 * PropertyPreviewRenderer
 * @param props.data - the data being rendered by PropertyPreview
 * @param props.propertyPreview - The PropertyPreview object
 */
export function PropertyPreviewRenderer(props: {
    data: any;
    propertyPreview: PropertyPreview;
}) {
    const { propertyPreview } = props;
    const { variant } = propertyPreview;
    const compiledTemplate = applyPropertyPreview(props);

    if (compiledTemplate === "") {
        return null;
    }

    // Handle CollectionTemplateVariant
    if (variant === PropertyPreviewLayoutVariant.CODE_DARK) {
        return (
            <pre className="mb-0 py-1 px-2 bg-gray-800 text-light rounded">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === PropertyPreviewLayoutVariant.CODE_LIGHT) {
        return (
            <pre className="mb-0 py-1 px-2 bg-gray-200 border-gray-800 text-gray-800 rounded border border-gray-800">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === PropertyPreviewLayoutVariant.BADGE_DARK) {
        return (
            <span className="px-2 py-1 bg-gray-800 text-light rounded">
                {compiledTemplate}
            </span>
        );
    }

    if (variant === PropertyPreviewLayoutVariant.BADGE_LIGHT) {
        return (
            <span className="px-2 py-1 bg-gray-200 text-gray-800 rounded border border-gray-800">
                {compiledTemplate}
            </span>
        );
    }

    // Return null to prevent invariant error
    return null;
}
