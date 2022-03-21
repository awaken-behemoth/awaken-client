import { motion } from "framer-motion";
import { useEffect } from "react";
import { useRoutingStateContext } from "../usePageTransition";


interface Props {
  children: React.ReactNode;
}

const TransitionManager: React.FC<Props> = ({ children }) => {
  const page = useRoutingStateContext();

  useEffect(() => {
    page.addEventListener("onExit", (ctx) => {
      page.waitFor("fade-out");
    });
  }, []);


  return (
    <motion.div
      animate={
        page.currentState === "exit" ? { opacity: 0 } : { opacity: 1 }
      }
      onAnimationComplete={(arg: { opacity: number }) => {
        if (arg.opacity === 0) {
          page.removeHold("fade-out");
        }
      }}
    >
      {children}
    </motion.div>
  );
};

export default TransitionManager;
