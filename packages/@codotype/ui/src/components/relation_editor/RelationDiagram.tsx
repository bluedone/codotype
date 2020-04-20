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
    direction: string;
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

    const icon = direction === "out" ? faArrowRight : faArrowLeft;

    return (
        <div className="row d-flex flex-row align-items-center">
            <div className="col-lg-12">
                <span className="text-primary">
                    {sourceManyOrOne} <strong>{sourceLabel}</strong>
                    {slim && sourceLabel !== sourceAlias && (
                        // ADD TOOLTIP_LEFT => `as "${sourceAlias}"`
                        <span>
                            <FontAwesomeIcon
                                className="text-primary ml-1"
                                icon={faMask}
                            />
                        </span>
                    )}
                    {!slim && sourceLabel !== sourceAlias && (
                        <span className="text-primary ml-1">
                            (as <i>{sourceAlias})</i>
                        </span>
                    )}
                    <FontAwesomeIcon className={iconCss} icon={icon} />
                </span>

                <span className="text-info">
                    {destManyOrOne} <strong>{destLabel}</strong>
                </span>

                {slim && destLabel !== destAlias && (
                    // TOOLTIP-RIGHT --> as ${destAlias}
                    <span>
                        <FontAwesomeIcon
                            className="text-info ml-1"
                            icon={faMask}
                        />
                    </span>
                )}

                {!slim && destLabel !== destAlias && (
                    <span className="text-info">
                        {" "}
                        (as <i>{destAlias})</i>
                    </span>
                )}
            </div>
        </div>
    );
}
