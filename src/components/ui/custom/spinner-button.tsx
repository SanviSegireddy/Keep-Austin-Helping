import React from "react";
import { Button } from "../button";

interface SpinnerButtonProps extends React.ComponentProps<typeof Button> {
  isPending: boolean;
}

const SpinnerButton = ({ isPending, ...props }: SpinnerButtonProps) => {
  return (
    <Button disabled={isPending} {...props}>
      {isPending ? (
        <span className="animate-spin size-5 border-2 border-r-transparent opacity-75 rounded-full" />
      ) : (
        <p>{props.children}</p>
      )}
    </Button>
  );
};

export default SpinnerButton;
