"use client";

import SvgSignIn from "@/assets/sprite/sign-in.svg";
import SvgSignUp from "@/assets/sprite/sign-up.svg";
import { SimpleButton } from "@/components/simple-button";
import { useViewport } from "@/hooks/viewport";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";

export const Auth = () => {
  const { t } = useTranslation();
  const { isMobile } = useViewport();
  const router = useRouter();

  return (
    <>
      <SimpleButton type="primary" data-cy="register-btn" onClick={() => router.push("/sign-up")}>
        <SvgSignUp className="h-4 w-4" />
        {!isMobile ? t("buttons.sign_up") : null}
      </SimpleButton>
      <SimpleButton type="primary" data-cy="login-btn" onClick={() => router.push("/sign-in")}>
        <SvgSignIn className="h-4 w-4" />
        {!isMobile ? t("buttons.sign_in") : null}
      </SimpleButton>
    </>
  );
};
