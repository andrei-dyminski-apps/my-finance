import { supabase } from "@/api/supabase";
import { getUserId } from "@/helpers/localStorage";
import { getCurrentDate } from "@/helpers/date";
import { ProfileData, SettingsData } from "@/types/profile";

export const getProfileApi = () =>
  supabase.from("profiles").select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)").eq("id", getUserId()).single();

export const updateProfileApi = (userData: Partial<ProfileData | SettingsData>) =>
  supabase
    .from("profiles")
    .update({ ...userData, updated_at: getCurrentDate() })
    .eq("id", getUserId())
    .select("id, created_at, updated_at, email, full_name, birthdate, gender, period, currency(id, code, symbol)")
    .single();
