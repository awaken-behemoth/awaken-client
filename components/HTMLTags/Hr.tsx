import React from "react";

interface Props {
  children: React.ReactNode;
  className?: string;
  color?: string;
  padding: string;
}

const Hr: React.FC<Props> = ({
  children,
  color,
  padding,
  className,
}) => {
  return (
    <p className="flex justify-center align-center h-fit relative">
      <span
        className=" shrink-0 bg-gray-400 flex-1 m-auto h-px block"
        style={{ backgroundColor: color }}
      ></span>
      <span className={className} style={{padding}}>{children}</span>
      <span
        className=" shrink-0 bg-gray-400 flex-1 w-1/3 m-auto h-px block"
        style={{ backgroundColor: color }}
      ></span>
    </p>
  );
};

export default Hr;