import { createSelector } from "@reduxjs/toolkit";
import { INITIAL_CONTACT_FIELDS } from "@/constants/contact";
import { selectProfile } from "@/store/selectors/profile";

export const selectContactFields = createSelector([selectProfile], (profile) => INITIAL_CONTACT_FIELDS.map((field) => ({ ...field, value: profile?.[field.id] || field.value })));
