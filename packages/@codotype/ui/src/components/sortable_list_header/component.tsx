import * as React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { OverlayTrigger, Tooltip } from "react-bootstrap";

// // // //

interface SortableListHeaderProps {
    label: string;
    onClick: () => void;
    tooltip?: string;
    rounded?: boolean;
}

/**
 * SortableListHeader
 * Renders the card-header for AttributeEditor and RelationEditor
 * @param props - see `SortableListHeaderProps`
 */
export function SortableListHeader(props: SortableListHeaderProps) {
    const { tooltip = "", rounded = true } = props;
    let styles = {};
    if (!rounded) {
        styles = {
            borderTopLeftRadius: "0px",
            borderTopRightRadius: "0px",
        };
    }

    return (
        <div
            className="card-header p-2 d-flex align-items-center justify-content-between"
            style={styles}
        >
            <div className="d-flex align-items-center">
                <OverlayTrigger
                    placement="bottom"
                    overlay={
                        <Tooltip id="attribute-editor-header">
                            {tooltip}
                        </Tooltip>
                    }
                >
                    <button
                        className="btn btn-sm btn-primary"
                        onClick={props.onClick}
                    >
                        <FontAwesomeIcon icon={faPlus} />
                    </button>
                </OverlayTrigger>
                <strong className="d-block mb-0 ml-2">{props.label}</strong>
            </div>
        </div>
    );
}
