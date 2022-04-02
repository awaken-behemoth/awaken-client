import React from "react";
import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";

interface LinkProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}

const Link: React.FC<LinkProps> = React.forwardRef(
  ({ children, ...props }, ref: any) => {
    return (
      <a {...props} ref={ref}>
        {children}
      </a>
    );
  }
);

Link.displayName = "Link";

export default Link;
