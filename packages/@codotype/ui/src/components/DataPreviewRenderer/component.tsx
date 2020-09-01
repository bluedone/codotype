import * as React from "react";
import {
    applyDataPreview,
    DataPreview,
    DataPreviewLayoutVariant,
} from "@codotype/core";

// // // //

/**
 * DataPreviewRenderer
 * @param props.data - the data being rendered by DataPreview
 * @param props.dataPreview - The DataPreview object
 */
export function DataPreviewRenderer(props: {
    data: any;
    dataPreview: DataPreview;
}) {
    const { dataPreview } = props;
    const { variant } = dataPreview;
    const compiledTemplate = applyDataPreview(props);

    if (compiledTemplate === "") {
        return null;
    }

    // Handle CollectionTemplateVariant
    if (variant === DataPreviewLayoutVariant.CODE_DARK) {
        return (
            <pre className="mb-0 py-1 px-2 bg-dark text-light rounded">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === DataPreviewLayoutVariant.CODE_LIGHT) {
        return (
            <pre className="mb-0 py-1 px-2 bg-light border-dark text-dark rounded border border-dark">
                {compiledTemplate}
            </pre>
        );
    }

    if (variant === DataPreviewLayoutVariant.BADGE_DARK) {
        return (
            <span className="px-2 py-1 bg-dark text-light rounded">
                {compiledTemplate}
            </span>
        );
    }

    if (variant === DataPreviewLayoutVariant.BADGE_LIGHT) {
        return (
            <span className="px-2 py-1 bg-light text-dark rounded border border-dark">
                {compiledTemplate}
            </span>
        );
    }

    // Return null to prevent invariant error
    return null;
}
