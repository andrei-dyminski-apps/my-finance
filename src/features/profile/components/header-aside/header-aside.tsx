import { InnerHeaderAsidePortal } from "@/features/inner-layout";
import { Button } from "antd";
import SvgLogout from "@/assets/sprite/logout.svg";
import { useState } from "react";
import { logoutProfileThunk } from "../../store";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@/hooks/store";

export const HeaderAside = () => {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const [isLogoutLoading, setIsLogoutLoading] = useState(false);

  const handleLogout = async (): Promise<void> => {
    setIsLogoutLoading(true);
    await dispatch(logoutProfileThunk());
    setIsLogoutLoading(false);
  };

  const headerActions = (
    <Button type="primary" danger loading={isLogoutLoading} data-cy="logout-btn" className="ml-auto !flex items-center gap-2" onClick={handleLogout}>
      <SvgLogout className="h-4 w-4" />
      {t("buttons.logout")}
    </Button>
  );

  return <InnerHeaderAsidePortal>{headerActions}</InnerHeaderAsidePortal>;
};
