import * as React from "react";
import { Datatype } from "@codotype/types";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
    faSnowflake,
    faQuoteRight,
    IconDefinition,
    faHashtag,
    faToggleOn,
} from "@fortawesome/free-solid-svg-icons";

// // // //

// Maps datatype to FontAwesome icon
// TODO - replace with actual icons for all of these
const mapDatatypeToIcon: { [key in Datatype]: IconDefinition } = {
    [Datatype.STRING]: faQuoteRight,
    [Datatype.TEXT]: faQuoteRight,
    [Datatype.INTEGER]: faHashtag,
    [Datatype.BIGINT]: faHashtag,
    [Datatype.FLOAT]: faHashtag,
    [Datatype.DECIMAL]: faHashtag,
    [Datatype.NUMERIC]: faHashtag,
    [Datatype.BOOLEAN]: faToggleOn,
    [Datatype.DATE]: faSnowflake,
    [Datatype.TIME]: faSnowflake,
    [Datatype.DATETIME]: faSnowflake,
    [Datatype.TIMESTAMP]: faSnowflake,
    [Datatype.BINARY]: faSnowflake,
    [Datatype.JSON]: faSnowflake,
    [Datatype.JSONB]: faSnowflake,
    [Datatype.OBJECT]: faSnowflake,
    [Datatype.STRING_ARRAY]: faSnowflake,
    [Datatype.TEXT_ARRAY]: faSnowflake,
    [Datatype.INTEGER_ARRAY]: faSnowflake,
    [Datatype.BIGINT_ARRAY]: faSnowflake,
    [Datatype.FLOAT_ARRAY]: faSnowflake,
    [Datatype.DECIMAL_ARRAY]: faSnowflake,
    [Datatype.NUMERIC_ARRAY]: faSnowflake,
    [Datatype.BOOLEAN_ARRAY]: faSnowflake,
    [Datatype.DATE_ARRAY]: faSnowflake,
    [Datatype.TIME_ARRAY]: faSnowflake,
    [Datatype.DATETIME_ARRAY]: faSnowflake,
    [Datatype.TIMESTAMP_ARRAY]: faSnowflake,
    [Datatype.SINGLE_FILE]: faSnowflake,
    [Datatype.SINGLE_IMAGE]: faSnowflake,
};

export function DatatypeIcon(props: {
    datatype: Datatype;
    className?: string;
}) {
    return (
        <FontAwesomeIcon
            className={props.className}
            icon={mapDatatypeToIcon[props.datatype]}
        />
    );
}
