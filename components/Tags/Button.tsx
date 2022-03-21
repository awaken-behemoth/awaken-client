import {
  AnchorHTMLAttributes,
  ButtonHTMLAttributes,
  DetailedHTMLProps,
} from "react";

interface AnchorProps
  extends DetailedHTMLProps<
    AnchorHTMLAttributes<HTMLAnchorElement>,
    HTMLAnchorElement
  > {}
interface ButtonProps
  extends DetailedHTMLProps<
    ButtonHTMLAttributes<HTMLButtonElement>,
    HTMLButtonElement
  > {}

type Button<T> = T extends string ? AnchorProps : ButtonProps;

const Button = <T extends unknown>( {children,...props} : { href?: T } & Button<T>) => {
  if (props.href) {
    //@ts-ignore
    return <a {...props}>{children}</a>;
  } else {
    return <button {...props}>{children}</button>;
  }
};


export default Button;
