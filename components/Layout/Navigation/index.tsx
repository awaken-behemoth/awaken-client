import { createContext, useContext, useEffect, useState } from "react";
import { useRoutingStateContext } from "../../../utils/hook/usePageTransition";
import DefaultNavigation from "./DefaultNavigation";
import NavigationConfig from "./NavigationConfig";
import NavigationPreset from "./NavigationPreset";

const NavigationContext = createContext({
  setConfig: undefined,
});

const Navigation: React.FC = ({ children }) => {
  const [config, setConfig] = useState<NavigationConfig>({
    preset: NavigationPreset.DEFAULT,
  });

  let ActiveNav;

  switch (config.preset) {
    case NavigationPreset.NONE:
      ActiveNav = () => <></>;
      break;
    default:
      ActiveNav = DefaultNavigation;
  }

  return (
    <NavigationContext.Provider value={{ setConfig }}>
      <ActiveNav />
      {children}
    </NavigationContext.Provider>
  );
};

export const useNavigationConfig = (config: NavigationConfig) => {
  const { setConfig } = useContext(NavigationContext);

  useEffect(() => {
    setConfig(config);
  }, []);
};

export default Navigation;
