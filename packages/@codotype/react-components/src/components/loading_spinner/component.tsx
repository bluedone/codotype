import * as React from "react";
import "./styles.scss";

// // // //

/**
 * LoadingSpinner
 * Renders a spinning Codotype Logo
 */
export function LoadingSpinner(props: { className?: string }) {
    return (
        <img
            {...props}
            id="loading"
            src="https://res.cloudinary.com/codotype/image/upload/c_scale,w_200/v1560045005/tech-logos/codotype.png"
            width="100px"
            height="100px"
        />
    );
}
