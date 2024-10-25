"use client";

import { useTranslation } from "react-i18next";
import { selectProfileFields } from "../../selectors";
import { getProfileThunk, updateProfileThunk } from "../../store";
import { showNotification } from "@/utils/show-notification";
import { showCommonError } from "@/utils/show-common-error";
import { isProfileData } from "../../predicates";
import { Dates, HeaderAside } from "../../components";
import { useAppDispatch, useAppSelector } from "@/hooks/store";
import { type DefaultFormSaveHandler, DefaultForm } from "@/features/default-form";

export default function Page() {
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const profileFields = useAppSelector(selectProfileFields);

  const handleSaveProfile: DefaultFormSaveHandler = async (profileData) => {
    try {
      if (!isProfileData(profileData)) return;
      await dispatch(updateProfileThunk(profileData)).unwrap();
      await dispatch(getProfileThunk());
      showNotification({ title: t("notifications.profile.update") });
    } catch (error) {
      showCommonError({ error });
    }
  };

  return (
    <>
      <HeaderAside />
      <Dates />
      <DefaultForm fields={profileFields} data-cy="edit-profile-form" onSaveForm={handleSaveProfile} />
    </>
  );
}
