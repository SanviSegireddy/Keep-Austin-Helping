/* eslint-disable @typescript-eslint/no-empty-object-type */
import * as React from "react";
import { EyeIcon, EyeOffIcon } from "lucide-react";

import { Input } from "@/components/ui/input";

export interface PasswordInputProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const PasswordInput = React.forwardRef<HTMLInputElement, PasswordInputProps>(
  ({ className, ...props }, ref) => {
    const [showPassword, setShowPassword] = React.useState(false);
    return (
      <Input
        type={showPassword ? "text" : "password"}
        suffix={
          showPassword ? (
            <EyeIcon
              className="select-none cursor-pointer opacity-80 size-4"
              onClick={() => setShowPassword(false)}
            />
          ) : (
            <EyeOffIcon
              className="select-none cursor-pointer opacity-80 size-4"
              onClick={() => setShowPassword(true)}
            />
          )
        }
        className={className}
        {...props}
        ref={ref}
      />
    );
  }
);
PasswordInput.displayName = "PasswordInput";

export { PasswordInput };
