import {
  AnimatePresence,
  motion,
  MotionProps,
  useAnimation,
} from "framer-motion";
import React, { DependencyList } from "react";
import { useRef, useState, HTMLProps, ReactNode, useEffect } from "react";

interface DynamicHeightProps extends MotionProps {}

const DynamicHeight: React.FC<DynamicHeightProps> = ({
  children,
  ...props
}) => {
  return (
    <AnimatePresence>
      {children && (
        <motion.div
          key="modal"
          initial={{ height: 0 }}
          animate={{ height: "auto" }}
          exit={{ height: 0 }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(DynamicHeight);
