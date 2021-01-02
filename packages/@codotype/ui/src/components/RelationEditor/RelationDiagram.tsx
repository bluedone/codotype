import { Relation } from "@codotype/core";
import * as React from "react";
import classnames from "classnames";
import {
    faArrowRight,
    faArrowLeft,
    faMask,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

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
            {sourceManyOrOne} <strong>{sourceAlias}</strong>
            {slim && sourceLabel !== sourceAlias && (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`edit-button-tooltip`}>
                            References <strong>{sourceLabel}</strong> Schema
                        </Tooltip>
                    }
                >
                    <FontAwesomeIcon
                        className={classnames("ml-1", textColor)}
                        icon={faMask}
                    />
                </OverlayTrigger>
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
                {destManyOrOne} <strong>{destAlias}</strong>
            </span>

            {slim && destLabel !== destAlias && (
                <OverlayTrigger
                    placement="top"
                    overlay={
                        <Tooltip id={`edit-button-tooltip`}>
                            References <strong>{destLabel}</strong> Schema
                        </Tooltip>
                    }
                >
                    <FontAwesomeIcon
                        className={classnames("ml-1", oppositeTextColor)}
                        icon={faMask}
                    />
                </OverlayTrigger>
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
        <div className="row flex flex-row items-center">
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
