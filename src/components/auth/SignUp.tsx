import { INITIAL_SIGN_UP_FIELDS } from "@/constants/auth";
import { useTranslation } from "react-i18next";
import { useViewport } from "@/hooks/viewport";
import { useRecaptcha } from "@/hooks/providers/recaptcha";
import SvgSignUp from "@/assets/sprite/sign-up.svg";
import { SimpleButton } from "@/components/form/SimpleButton";
import { useAntd } from "@/hooks/providers/antd";
import { useModalState } from "@/hooks/providers/modalState";
import dynamic from "next/dynamic";
import { useAppDispatch } from "@/hooks/redux";
import { isRegisterData } from "@/predicates/auth";
import { showCommonError } from "@/helpers/errors";
import type { DefaultFormSaveHandler } from "@/types/form";

const AuthModal = dynamic(() => import("@/components/auth/AuthModal").then(({ AuthModal }) => ({ default: AuthModal })));

export const SignUp = () => {
  const dispatch = useAppDispatch();
  const { isMobile } = useViewport();
  const { t } = useTranslation();
  const { initCaptcha, isLoadedCaptcha, getScore } = useRecaptcha();

  const { isLoadedAuthModal, isOpenSignUpModal, toggleSignUpModalVisibility } = useModalState();
  const { initAntd, isLoadedAntd, isLoadingAntd } = useAntd();
  const isLoading = isOpenSignUpModal && (!isLoadedCaptcha || !isLoadedAuthModal);

  const handleToggleVisibility = (): void => {
    toggleSignUpModalVisibility();
    if (!isLoadedAntd) initAntd();
    if (!isLoadedCaptcha) initCaptcha();
  };

  const handleSubmitForm: DefaultFormSaveHandler = async (fieldsValues) => {
    try {
      const score = await getScore();
      const registerData = { ...fieldsValues, score };
      if (!isRegisterData(registerData)) return;
      if (score < 0.5) return import("@/helpers/modals").then(({ showNotification }) => showNotification({ title: t("notifications.recaptcha_invalid") }));
      const { registerUserThunk } = await import("@/store/slices/authSlice");
      await dispatch(registerUserThunk(registerData)).unwrap();
      handleToggleVisibility();
    } catch (error) {
      showCommonError();
    }
  };

  return (
    <>
      <SimpleButton type="primary" loading={isLoading} data-cy="register-btn" onClick={handleToggleVisibility}>
        <SvgSignUp className="h-4 w-4" />
        {!isMobile ? t("buttons.sign_up") : null}
      </SimpleButton>
      {isLoadedAuthModal && (
        <AuthModal
          type="register"
          title={t("titles.registration")}
          fields={INITIAL_SIGN_UP_FIELDS}
          isOpen={!isLoadingAntd && isOpenSignUpModal}
          onSaveForm={handleSubmitForm}
          onToggleVisibility={handleToggleVisibility}
        />
      )}
    </>
  );
};