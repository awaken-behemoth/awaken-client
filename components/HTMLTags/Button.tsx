import React from "react";
import {
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";

interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

const Button: React.FC<ButtonProps> = React.forwardRef(
  ({ children, disabled, ...props }, ref: any) => {
    return (
      <button {...props} ref={ref}>
        {children}
      </button>
    );
  }
);

export default Button;
