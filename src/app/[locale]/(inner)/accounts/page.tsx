import { initTranslations } from "@/i18n";
import { InnerLayout } from "@/features/inner-layout";
import { AccountsPageModule } from "@/features/accounts/";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/utils/get-jsonld";
import { Pages } from "@/types/router";
import type { LinkItem } from "@/types/breadcrumbs";
import type { Metadata } from "next";
import type { Locale } from "@/types/locales";
import type { ReactElement } from "react";

export async function generateMetadata({ params: { locale } }: { params: { locale: Locale } }): Promise<Metadata> {
  const { t } = await initTranslations({ locale });
  return {
    title: t(`pages.accounts.title`),
    description: t(`pages.accounts.description`),
    keywords: t(`pages.accounts.keywords`),
  };
}

export default async function Accounts({ params: { locale } }: { params: { locale: Locale } }): Promise<ReactElement> {
  const { t } = await initTranslations({ locale });

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "accounts", name: t("navigation.accounts.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout page={Pages.ACCOUNTS} breadcrumbs={breadcrumbList}>
        <AccountsPageModule />
      </InnerLayout>
    </>
  );
}
