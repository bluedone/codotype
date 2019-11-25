import * as React from "react";

interface DestroyButtonProps {
  onClick: () => void;
}

export function DestroyButton(props: DestroyButtonProps) {
  return (
    <button onClick={props.onClick}>
      <i className="fa fa-fw fa-trash" />
      Remove
    </button>
  )
}