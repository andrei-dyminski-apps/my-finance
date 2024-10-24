"use client";

import { selectSettingsFields } from "../../selectors";
import { getProfileThunk, updateProfileThunk } from "../../store";
import { showNotification } from "@/utils/show-notification";
import { useTranslation } from "react-i18next";
import { showCommonError } from "@/utils/show-common-error";
import { isSettingsData } from "../../predicates";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { type DefaultFormSaveHandler, DefaultForm } from "@/features/default-form";

export default function Page() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profileFields = useAppSelector(selectSettingsFields);

  const handleSaveProfile: DefaultFormSaveHandler = async (profileData) => {
    try {
      if (!isSettingsData(profileData)) return;
      await dispatch(updateProfileThunk(profileData)).unwrap();
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.settings.update") });
    } catch (error) {
      showCommonError({ error });
    }
  };

  return <DefaultForm fields={profileFields} data-cy="edit-settings-form" onSaveForm={handleSaveProfile} />;
}
