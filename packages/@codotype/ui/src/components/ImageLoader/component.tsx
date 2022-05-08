import * as React from "react";
import ReactImageFallback from "react-image-fallback";

// // // //

interface ImageLoaderProps {
    src: string;
    alt?: string;
    className?: string;
    initialTimeout?: number;
}

/**
 * ImageLoader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `ImageLoaderProps`
 */
export function ImageLoader(props: ImageLoaderProps) {
    const { src, alt = "", className = "", initialTimeout = 0 } = props;
    return (
        <ReactImageFallback
            src={src}
            alt={alt}
            className={className}
            initialTimeout={initialTimeout}
            initialImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII="
            fallbackImage="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAIAAAACCAYAAABytg0kAAAAFElEQVQIW2MMDQ39z8DAwMAIYwAAKgMD/9AXrvgAAAAASUVORK5CYII="
        />
    );
}
