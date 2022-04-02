import { motion,useAnimation } from "framer-motion";
import React, { DependencyList } from "react";
import {
  useRef,
  useState,
  HTMLProps,
  ReactNode,
  useEffect,
} from "react";

interface DynamicHeightProps extends HTMLProps<HTMLDivElement> {
  /**
   * List of values that react the component should watch. When the value changes, 
   * {@link DynamicHeight} will update its height; Be careful while passing the dependencies
   * as react cannot watch for its correctness
   */
  dependencies: DependencyList
}

/**
 * Responsive component that resizes depending of the size of its content;
 *
 * > IMPORTANT: Setting an height or a padding son this component is not supported
 *
 */
const DynamicHeight: React.FC<DynamicHeightProps> = ({ children,dependencies, ...props }) => {
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

    // eslint-disable-next-line
  }, [...dependencies, height, children]);

  useEffect(() => {
    // When the controlled children is swapped with animate the height property to the height
    // of the current height.
    const futureHeight = containerRef.current.clientHeight;
    height.start({ height: futureHeight });
  }, [currentChildren, height]);

  return (
    <motion.div
      animate={height}
      onAnimationComplete={() => {
        // when the animation completes, we set the height property to auto so that everything is responsive;

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
