import { AnimatePresence, motion, MotionProps } from 'framer-motion';
import React from 'react';

type DynamicHeightProps = MotionProps;

const DynamicHeight: React.FC<DynamicHeightProps> = ({
  children,
  ...props
}) => {
  return (
    <AnimatePresence>
      {children && (
        <motion.div
          key="modal"
          initial={{
            height: 0
          }}
          animate={{
            height: 'auto'
          }}
          exit={{
            height: 0
          }}
          {...props}
        >
          {children}
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default React.memo(DynamicHeight);
