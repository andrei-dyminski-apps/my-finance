"use client";

import dynamic from "next/dynamic";

const Page = dynamic(() => import("./page"));

export function SettingsPageModule() {
  return <Page />;
}
