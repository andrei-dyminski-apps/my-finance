import { LoginData, RegisterData } from "@/types/auth";
import { FieldIds } from "@/types/field";

export const isLoginData = (data: Record<string, unknown>): data is LoginData => FieldIds.EMAIL in data && FieldIds.PASSWORD in data;

export const isRegisterData = (data: Record<string, unknown>): data is RegisterData =>
  "score" in data && ((Object.keys(data).length === 3 && isLoginData(data)) || (Object.keys(data).length === 4 && isLoginData(data) && FieldIds.FULL_NAME in data));
