import * as React from "react";
import { Datatype, Datatypes } from "@codotype/core";
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
const mapDatatypeToIcon: { [key in Datatypes]: IconDefinition } = {
    [Datatypes.STRING]: faQuoteRight,
    [Datatypes.TEXT]: faQuoteRight,
    [Datatypes.INT]: faHashtag,
    [Datatypes.BIGINT]: faHashtag,
    [Datatypes.FLOAT]: faHashtag,
    [Datatypes.DECIMAL]: faHashtag,
    [Datatypes.NUMERIC]: faHashtag,
    [Datatypes.BOOLEAN]: faToggleOn,
    [Datatypes.DATE]: faCalendar,
    [Datatypes.TIME]: faClock,
    [Datatypes.DATETIME]: faCalendar,
    [Datatypes.TIMESTAMP]: faClock,
    [Datatypes.BINARY]: faFileCode,
    [Datatypes.JSON]: faCode,
    [Datatypes.JSONB]: faCode,
    [Datatypes.OBJECT]: faCode,
    [Datatypes.STRING_ARRAY]: faQuoteRight,
    [Datatypes.TEXT_ARRAY]: faQuoteRight,
    [Datatypes.INT_ARRAY]: faHashtag,
    [Datatypes.BIGINT_ARRAY]: faHashtag,
    [Datatypes.FLOAT_ARRAY]: faHashtag,
    [Datatypes.DECIMAL_ARRAY]: faHashtag,
    [Datatypes.NUMERIC_ARRAY]: faHashtag,
    [Datatypes.BOOLEAN_ARRAY]: faToggleOn,
    [Datatypes.DATE_ARRAY]: faCalendar,
    [Datatypes.TIME_ARRAY]: faClock,
    [Datatypes.DATETIME_ARRAY]: faCalendar,
    [Datatypes.TIMESTAMP_ARRAY]: faClock,
    [Datatypes.SINGLE_FILE]: faFile,
    [Datatypes.SINGLE_IMAGE]: faFileImage,
    [Datatypes.UUID]: faQuoteRight,
    [Datatypes.UUID_ARRAY]: faQuoteRight,
    [Datatypes.OBJECT_ID]: faQuoteRight,
    [Datatypes.OBJECT_ID_ARRAY]: faQuoteRight,
    [Datatypes.ID]: faQuoteRight,
    [Datatypes.ID_ARRAY]: faQuoteRight,
    [Datatypes.AUTO_INCREMENTED_ID]: faQuoteRight,
    [Datatypes.AUTO_INCREMENTED_ID_ARRAY]: faQuoteRight,
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
