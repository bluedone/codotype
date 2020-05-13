import { Relation } from "@codotype/types";
import * as React from "react";
import classnames from "classnames";
import {
    faArrowRight,
    faArrowLeft,
    faMask,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

// // // //

export interface RelationDiagramProps {
    direction: "in" | "out";
    sourcePlural: boolean;
    sourceLabel: string;
    sourceAlias: string;
    destPlural: boolean;
    destLabel: string;
    destAlias: string;
    slim: boolean;
}

export function RelationDiagram(props: RelationDiagramProps) {
    const {
        sourcePlural = false,
        sourceAlias,
        sourceLabel,
        direction,
        destPlural = false,
        destLabel,
        destAlias,
        slim = false,
    } = props;

    const sourceManyOrOne = sourcePlural ? "Many" : "One";
    const destManyOrOne = destPlural ? "Many" : "One";

    const iconCss = classnames("mx-1", {
        "text-primary": direction === "out",
        "text-info": direction !== "out",
    });

    const textColor = classnames({
        "text-primary": direction === "out",
        "text-info": direction !== "out",
    });

    const oppositeTextColor = classnames({
        "text-primary": direction !== "out",
        "text-info": direction === "out",
    });

    const icon = direction === "out" ? faArrowRight : faArrowLeft;

    const source = (
        <span className={textColor}>
            {sourceManyOrOne} <strong>{sourceLabel}</strong>
            {slim && sourceLabel !== sourceAlias && (
                // ADD TOOLTIP_LEFT => `as "${sourceAlias}"`
                <span>
                    <FontAwesomeIcon
                        className={classnames("ml-1", textColor)}
                        icon={faMask}
                    />
                </span>
            )}
            {!slim && sourceLabel !== sourceAlias && (
                <span className={classnames("ml-1", textColor)}>
                    (as <i>{sourceAlias})</i>
                </span>
            )}
        </span>
    );

    const dest = (
        <React.Fragment>
            <span className={oppositeTextColor}>
                {destManyOrOne} <strong>{destLabel}</strong>
            </span>

            {slim && destLabel !== destAlias && (
                // TOOLTIP-RIGHT --> as ${destAlias}
                <span>
                    <FontAwesomeIcon
                        className={classnames("ml-1", oppositeTextColor)}
                        icon={faMask}
                    />
                </span>
            )}

            {!slim && destLabel !== destAlias && (
                <span className={oppositeTextColor}>
                    {" "}
                    (as <i>{destAlias})</i>
                </span>
            )}
        </React.Fragment>
    );

    return (
        <div className="row d-flex flex-row align-items-center">
            <div className="col-lg-12">
                {props.direction === "out" && source}
                {props.direction === "in" && dest}
                <FontAwesomeIcon className={iconCss} icon={icon} />
                {props.direction === "out" && dest}
                {props.direction === "in" && source}
            </div>
        </div>
    );
}
