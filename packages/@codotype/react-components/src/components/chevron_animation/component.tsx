import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faChevronRight } from "@fortawesome/free-solid-svg-icons";
import "./styles.scss";

// // // //

interface ChevronAnimationProps {
    active: boolean;
}

/**
 * ChevronAnimation
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `ChevronAnimationProps`
 */
export function ChevronAnimation(props: ChevronAnimationProps) {
    return (
        <span className="ml-2">
            {props.active && (
                <FontAwesomeIcon
                    icon={faChevronRight}
                    className="animate-shift"
                />
            )}
            {!props.active && <FontAwesomeIcon icon={faChevronRight} />}
        </span>
    );
}
