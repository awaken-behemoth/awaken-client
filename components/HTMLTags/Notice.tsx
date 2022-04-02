import { HTMLProps, ReactNode } from "react";
import { themes } from "../Layout/ThemeProvider";

interface NoticeProps extends HTMLProps< HTMLDivElement > {
    children: ReactNode,
    color: keyof typeof themes
}

const Notice: React.FC<NoticeProps> = ({children, color, className, ...props}) => {
  return (
    <span {...props} style={themes[color] as React.CSSProperties} className={`p-2 block border border-primary-300 bg-primary-500/20 text-primary-700 ${className}`}>
        {children}
    </span>
  );
};

export default Notice;
