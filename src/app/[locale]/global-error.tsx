"use client";

import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SimpleButton } from "@/components/Form/SimpleButton";
import * as Sentry from "@sentry/nextjs";
import { useRouter } from "next/navigation";

export default function GlobalError({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  const { t } = useTranslation();
  const router = useRouter();

  useEffect(() => {
    console.error(error);
    if (process.env.NODE_ENV === "production") Sentry.captureException(error);
  }, [error]);

  return (
    <section className="container flex grow flex-col items-center justify-center gap-4 text-center">
      <h1 className="text-xl font-black lg:text-3xl">{t("common.error")}</h1>
      <div className="flex flex-wrap justify-center gap-4">
        <SimpleButton type="primary" onClick={() => reset()}>
          {t("buttons.try_again")}
        </SimpleButton>
        <SimpleButton type="primary" onClick={() => router.push("/")}>
          {t("buttons.go_home")}
        </SimpleButton>
      </div>
    </section>
  );
}