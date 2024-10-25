import { I18nextProvider } from "react-i18next";
import { initTranslations } from "@/i18n";
import { useParams } from "next/navigation";
import { isStringLocale } from "@/predicates/locale";
import { createInstance, type Resource } from "i18next";
import type { ReactNode } from "react";

export function I18nProvider({ children, resources }: { children: ReactNode; resources: Resource }) {
  const i18nInstance = createInstance();
  const { locale } = useParams();

  if (!Array.isArray(locale) && isStringLocale(locale)) initTranslations({ locale, i18nInstance, resources });

  return <I18nextProvider i18n={i18nInstance}>{children}</I18nextProvider>;
}
