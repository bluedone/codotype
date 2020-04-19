import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import styled, { keyframes } from "styled-components";

// // // //

interface ChevronAnimationProps {
    active: boolean;
}

// // // //

// Sets up shift keyframes animation
const shift = keyframes`
        0% {
            opacity: 0;
            transform: translateX(0px);
        }
        10% {
            opacity: 0;
        }
        33% {
            opacity: 1;
        }
        66% {
            opacity: 0;
        }
        100% {
            opacity: 0;
            transform: translateX(20px);
        }
`;

// Defines StyledIcon using the `shift` animation
const StyledIcon = styled(FontAwesomeIcon)`
    animation: ${shift} 2.1s infinite;
`;

/**
 * ChevronAnimation
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `ChevronAnimationProps`
 */
export function ChevronAnimation(props: ChevronAnimationProps) {
    return (
        <span className="ml-2">
            {props.active && <StyledIcon icon={faChevronRight} />}
            {!props.active && <FontAwesomeIcon icon={faChevronRight} />}
        </span>
    );
}
