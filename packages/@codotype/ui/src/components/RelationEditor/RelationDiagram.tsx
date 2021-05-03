import { Relation } from "@codotype/core";
import * as React from "react";
import classnames from "classnames";
import {
    faArrowRight,
    faArrowLeft,
    faMask,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { Tooltip } from "../Tooltip";

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
        "text-blue-500": direction === "out",
        "text-teal-500": direction !== "out",
    });

    const textColor = classnames({
        "text-blue-500": direction === "out",
        "text-teal-500": direction !== "out",
    });

    const oppositeTextColor = classnames({
        "text-blue-500": direction !== "out",
        "text-teal-500": direction === "out",
    });

    const icon = direction === "out" ? faArrowRight : faArrowLeft;

    const source = (
        <span className={textColor}>
            {/* {sourceManyOrOne} <strong>{sourceAlias}</strong> */}
            {sourceManyOrOne}
            {slim && sourceLabel !== sourceAlias && (
                <Tooltip
                    position="left"
                    tooltipContent={
                        <>
                            References{" "}
                            <span className="text-indigo-500">
                                {sourceLabel}
                            </span>{" "}
                            Schema
                        </>
                    }
                >
                    <FontAwesomeIcon
                        className={classnames("ml-1", textColor)}
                        icon={faMask}
                    />
                </Tooltip>
            )}
            {!slim && sourceLabel !== sourceAlias && (
                <span className={classnames("ml-1", textColor)}>
                    (as <i>{sourceLabel})</i>
                </span>
            )}
        </span>
    );

    const dest = (
        <React.Fragment>
            <span className={oppositeTextColor}>
                {destManyOrOne}{" "}
                <span className="text-indigo-500">{destAlias}</span>
            </span>

            {slim && destLabel !== destAlias && (
                <Tooltip
                    position="left"
                    tooltipContent={
                        <>
                            References <strong>{destLabel}</strong> Schema
                        </>
                    }
                >
                    <FontAwesomeIcon
                        className={classnames("ml-1", oppositeTextColor)}
                        icon={faMask}
                    />
                </Tooltip>
            )}

            {!slim && destLabel !== destAlias && (
                <span className={oppositeTextColor}>
                    {" "}
                    (as <i>{destLabel})</i>
                </span>
            )}
        </React.Fragment>
    );

    return (
        <div className="flex flex-row items-center">
            {props.direction === "out" && source}
            {props.direction === "in" && dest}
            <FontAwesomeIcon className={iconCss} icon={icon} />
            {props.direction === "out" && dest}
            {props.direction === "in" && source}
        </div>
    );
}
