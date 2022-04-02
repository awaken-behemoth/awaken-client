import { motion, MotionProps, MotionStyle, useAnimation } from "framer-motion";
import React from "react";
import {
  HTMLProps,
  ReactNode,
  RefAttributes,
  useEffect,
  useRef,
  useState,
} from "react";
import Activity from "../../enum/Activity";

interface Props extends HTMLProps<HTMLDivElement> {
  dependencies: any[]
}
/**
 * Responsive component that resizes depending of the size of its content;
 *
 * > IMPORTANT: Setting an height or a padding son this component is not supported
 *
 */
const DynamicHeight: React.FC<Props> = ({ children,dependencies, ...props }) => {
  const [currentChildren, setCurrentChildren] = useState<ReactNode>(children);

  const containerRef = useRef<HTMLDivElement>();

  const height = useAnimation();

  useEffect(() => {
    // when the children change we take control of the height property
    // by setting it to the current height; we do that because framer motion
    // does not animate from auto to given values. Ones the two are in sync,
    // we can tell react to swap the children.

    const currentHeight = containerRef.current.clientHeight;
    height.set({ height: currentHeight });
    setCurrentChildren(children);
  }, dependencies);

  useEffect(() => {
    // When the controlled children is swapped with animate the height property to the height
    // of the current height.
    const futureHeight = containerRef.current.clientHeight;
    height.start({ height: futureHeight });
  }, [currentChildren]);

  return (
    <motion.div
      animate={height}
      onAnimationComplete={() => {
        // when the animation completes, set the height property to auto so that everything is responsive;

        height.set({ height: "auto" });
      }}
    >
      <div {...props} ref={containerRef}>
        {currentChildren}
      </div>
    </motion.div>
  );
};

export default React.memo(DynamicHeight);
