"use client";

import { RecaptchaProvider } from "@/providers/items/recaptcha";
import { AntdProvider } from "@/providers/items/antd";
import type { ReactNode } from "react";

export function ContactPageProvider({ children }: { children: ReactNode }) {
  return (
    <AntdProvider isActive>
      <RecaptchaProvider>{children}</RecaptchaProvider>
    </AntdProvider>
  );
}