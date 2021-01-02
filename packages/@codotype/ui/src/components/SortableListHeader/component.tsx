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
            borderRadius: "0px",
        };
    } else {
        styles = {
            borderBottomLeftRadius: "0px",
            borderBottomRightRadius: "0px",
        };
    }
    return (
        <OverlayTrigger
            placement="bottom"
            overlay={<Tooltip id="attribute-editor-header">{tooltip}</Tooltip>}
        >
            <button
                className="btn btn-block btn-primary"
                onClick={e => {
                    e.currentTarget.blur();
                    props.onClick();
                }}
                style={styles}
            >
                <div className="d-flex items-center">
                    <FontAwesomeIcon icon={faPlus} />
                    <p className="d-block mb-0 ml-2">{props.label}</p>
                </div>
            </button>
        </OverlayTrigger>
    );
}
