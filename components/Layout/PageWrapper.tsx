import { AnimatePresence, motion } from 'framer-motion';
import React from 'react';

import ThemeProvider from './ThemeProvider';

interface Props {
  child: React.ReactElement<any, React.JSXElementConstructor<any>>;
}

const Layout: React.FC<Props> = ({ child }) => {
  return (
    <>
      <ThemeProvider>
        <AnimatePresence exitBeforeEnter>
          <motion.div
            initial={{
              opacity: 0
            }}
            animate={{
              opacity: 1
            }}
            exit={{
              opacity: 0
            }}
            key={child.type.name}
            className="w-screen h-screen"
          >
            {child}
          </motion.div>
        </AnimatePresence>
      </ThemeProvider>
    </>
  );
};

export default Layout;
