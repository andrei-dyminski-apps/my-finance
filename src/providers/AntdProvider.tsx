import { useDarkTheme } from "@/hooks/theme.js";
import { useSelector } from "react-redux";
import { selectUser } from "@/store/selectors/auth";
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from "react";
import { useLocale } from "@/hooks/locale";
import { getUserId } from "@/helpers/localStorage.js";
import dynamic from "next/dynamic";
import { Preloader } from "@/components/Layout/Preloader";
import { usePathname } from "next/navigation";
import { Pages } from "@/types/router";

interface Theme {
  defaultAlgorithm: any;
  darkAlgorithm: any;
}

interface AntdContextType {
  initAntd: () => void;
  isLoadedAntd: boolean;
  isLoadingAntd: boolean;
  setIsLoadingAntd: (isLoading: boolean) => void;
}

const StyleProvider = dynamic(() => import("@ant-design/cssinjs/es/StyleContext").then(({ StyleProvider }) => StyleProvider));
const ConfigProvider = dynamic(() => import("antd/es/config-provider"));
const AntdRegistry = dynamic(() => import("@ant-design/nextjs-registry").then(({ AntdRegistry }) => AntdRegistry));

export const AntdContext = createContext<AntdContextType | undefined>(undefined);

export const AntdProvider = ({ children }: { children: ReactNode }) => {
  const darkTheme = useDarkTheme();
  const { antdLocale } = useLocale();
  const user = useSelector(selectUser);
  const pathname = usePathname();

  const isLoadedInitState = pathname.includes(Pages.CONTACT);
  const [isLoadedAntd, setIsLoadedAntd] = useState(isLoadedInitState);
  const [theme, setTheme] = useState<Theme>();
  const [isLoadingAntd, setIsLoadingAntd] = useState(false);

  const initAntd = useCallback((): void => {
    if (!isLoadedAntd) {
      setIsLoadingAntd(true);
      setIsLoadedAntd(true);
    }
    import("antd/es/theme").then(({ default: theme }) => setTheme(theme));
  }, [isLoadedAntd]);

  useEffect(() => {
    if ((!theme && isLoadedInitState) || (!isLoadedAntd && (getUserId() || user))) initAntd();
  }, [user, isLoadedInitState]);

  const contextValue = useMemo(() => ({ initAntd, isLoadedAntd, isLoadingAntd, setIsLoadingAntd }), [initAntd, isLoadedAntd, isLoadingAntd, setIsLoadingAntd]);

  const themeSettings = useMemo(() => (theme ? { algorithm: darkTheme ? theme.darkAlgorithm : theme.defaultAlgorithm } : undefined), [theme]);

  return (
    <Preloader isLoading={isLoadingAntd}>
      {isLoadedAntd ? (
        <AntdContext.Provider value={contextValue}>
          <AntdRegistry>
            <StyleProvider hashPriority="high">
              <ConfigProvider locale={antdLocale || undefined} theme={themeSettings}>
                {children}
              </ConfigProvider>
            </StyleProvider>
          </AntdRegistry>
        </AntdContext.Provider>
      ) : (
        <AntdContext.Provider value={contextValue}>{children}</AntdContext.Provider>
      )}
    </Preloader>
  );
};
