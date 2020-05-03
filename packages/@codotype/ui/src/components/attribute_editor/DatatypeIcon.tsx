import * as React from "react";
import { Datatype } from "@codotype/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faQuoteRight,
    IconDefinition,
    faHashtag,
    faToggleOn,
    faFileImage,
    faFile,
    faCalendar,
    faCode,
} from "@fortawesome/free-solid-svg-icons";
import { faClock, faFileCode } from "@fortawesome/free-regular-svg-icons";

// // // //

// Maps datatype to FontAwesome icon
const mapDatatypeToIcon: { [key in Datatype]: IconDefinition } = {
    [Datatype.STRING]: faQuoteRight,
    [Datatype.TEXT]: faQuoteRight,
    [Datatype.INTEGER]: faHashtag,
    [Datatype.BIGINT]: faHashtag,
    [Datatype.FLOAT]: faHashtag,
    [Datatype.DECIMAL]: faHashtag,
    [Datatype.NUMERIC]: faHashtag,
    [Datatype.BOOLEAN]: faToggleOn,
    [Datatype.DATE]: faCalendar,
    [Datatype.TIME]: faClock,
    [Datatype.DATETIME]: faCalendar,
    [Datatype.TIMESTAMP]: faClock,
    [Datatype.BINARY]: faFileCode,
    [Datatype.JSON]: faCode,
    [Datatype.JSONB]: faCode,
    [Datatype.OBJECT]: faCode,
    [Datatype.STRING_ARRAY]: faQuoteRight,
    [Datatype.TEXT_ARRAY]: faQuoteRight,
    [Datatype.INTEGER_ARRAY]: faHashtag,
    [Datatype.BIGINT_ARRAY]: faHashtag,
    [Datatype.FLOAT_ARRAY]: faHashtag,
    [Datatype.DECIMAL_ARRAY]: faHashtag,
    [Datatype.NUMERIC_ARRAY]: faHashtag,
    [Datatype.BOOLEAN_ARRAY]: faToggleOn,
    [Datatype.DATE_ARRAY]: faCalendar,
    [Datatype.TIME_ARRAY]: faClock,
    [Datatype.DATETIME_ARRAY]: faCalendar,
    [Datatype.TIMESTAMP_ARRAY]: faClock,
    [Datatype.SINGLE_FILE]: faFile,
    [Datatype.SINGLE_IMAGE]: faFileImage,
};

export function DatatypeIcon(props: {
    datatype: Datatype | null; // NOTE - only here because Attribute.datatype can be null, should be fixed
    className?: string;
    size?: "xs";
}) {
    if (props.datatype === null) {
        return null;
    }
    return (
        <FontAwesomeIcon
            className={props.className}
            icon={mapDatatypeToIcon[props.datatype]}
            size={props.size}
        />
    );
}
