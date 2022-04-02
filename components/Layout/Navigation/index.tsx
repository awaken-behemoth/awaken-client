import { createContext, useContext, useEffect, useState } from "react";
import DefaultNavigation from "./DefaultNavigation";
import EmptyComponent from "./EmptyComponent";
import NavigationConfig from "./NavigationConfig";
import NavigationPreset from "./NavigationPreset";

const NavigationContext = createContext({
  setConfig: undefined,
});

const Navigation: React.FC = ({ children }) => {
  const [config, setConfig] = useState<NavigationConfig>({
    preset: NavigationPreset.DEFAULT,
  });

  let ActiveNav : React.FC;

  switch (config.preset) {

    case NavigationPreset.NONE:
      ActiveNav = EmptyComponent;
      break;

    default:
      ActiveNav = DefaultNavigation;
  }

  ActiveNav.displayName = "ActiveNav";

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
  }, [config, setConfig]);
};

export default Navigation;
