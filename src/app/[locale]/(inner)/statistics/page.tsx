import type { Metadata } from "next";
import initTranslations from "@/i18n";
import StatisticsModule from "@/app/[locale]/(inner)/statistics/content-module";
import { InnerLayout } from "@/components/Layout/InnerLayout";
import { getJsonLdBreadcrumbs, getJsonLdWebsite } from "@/helpers/jsonLd";
import { LinkItem } from "@/types/Breadcrumbs";

const i18nNamespaces = ["default"];

export async function generateMetadata({ params: { locale } }: { params: { locale: string } }): Promise<Metadata> {
  const { t } = await initTranslations(locale, i18nNamespaces);
  return {
    title: t(`pages.statistics.title`),
    description: t(`pages.statistics.description`),
    keywords: t(`pages.statistics.keywords`),
  };
}

export default async function Statistics({ params: { locale } }: { params: { locale: string } }) {
  const { t } = await initTranslations(locale, i18nNamespaces);

  const breadcrumbList: LinkItem[] = [
    { path: "", name: t("navigation.home") },
    { path: "statistics", name: t("navigation.statistics.full") },
  ];

  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdBreadcrumbs(breadcrumbList)) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(getJsonLdWebsite(t("seo.app_name"))) }} />
      <InnerLayout locale={locale} page="statistics" breadcrumbs={breadcrumbList}>
        <StatisticsModule />
      </InnerLayout>
    </>
  );
}
