import * as React from "react";
import { string } from "prop-types";

// // // //

/**
 * SwitchInputProps
 * Props for the `SwitchInput` component
 * @param value - the current value of the switch (true/false)
 */
interface SwitchInputProps {
  value: boolean;
  onChange: (updatedValue: boolean) => void;
}

/**
 * SwitchInput
 * Renders a link that when clicked opens a new tab to some relevant information
 */
export function SwitchInput(props: SwitchInputProps) {
  return (
    <input
      type="checkbox"
      checked={props.value}
      onChange={e => {
        props.onChange(e.currentTarget.checked);
      }}
    />
  );
}
