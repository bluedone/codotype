import * as React from "react";

// // // //

/**
 * SwitchInputProps
 * Props for the `SwitchInput` component
 * @param value - the current value of the switch (true/false)
 * @param onChange - callback function to update `props.value`
 */
interface SwitchInputProps {
  value: boolean;
  onChange: (updatedValue: boolean) => void;
}

/**
 * SwitchInput
 * Renders an `<input type="checkbox" />` element
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
