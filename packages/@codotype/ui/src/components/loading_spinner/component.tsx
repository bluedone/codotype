import * as React from "react";
import styled, { keyframes } from "styled-components";

// // // //

// Sets up rotation keyframes animation
const rotation = keyframes`
  from {
      -webkit-transform: rotate(0deg);
  }
  to {
      -webkit-transform: rotate(359deg);
  }
`;

// Defines StyledImage using the `rotation` animation
const StyledImage = styled.img`
    animation: ${rotation} 1000ms infinite cubic-bezier(0.62, 0.23, 0.01, 0.83);
`;

// // // //

/**
 * LoadingSpinner
 * Renders a spinning Codotype Logo
 */
export function LoadingSpinner() {
    return (
        <StyledImage
            id="loading"
            src="https://res.cloudinary.com/codotype/image/upload/c_scale,w_200/v1560045005/tech-logos/codotype.png"
            width="100px"
            height="100px"
        />
    );
}
