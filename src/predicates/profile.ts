import { isObject } from "@/predicates/common";
import { FieldIds } from "@/types/field";
import type { ProfileData, SettingsData } from "@/types/profile";

export const isProfileData = (data: unknown): data is ProfileData => isObject(data) && FieldIds.FULL_NAME in data && FieldIds.EMAIL in data && FieldIds.BIRTHDATE in data && FieldIds.GENDER in data;

export const isSettingsData = (data: unknown): data is SettingsData => isObject(data) && FieldIds.PERIOD in data && FieldIds.CURRENCY in data;
