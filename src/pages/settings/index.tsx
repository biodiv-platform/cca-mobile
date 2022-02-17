import PageWrapper from "@components/core/page-wrapper";
import SettingsPageComponent from "@components/pages/settings";
import React from "react";
import { useTranslation } from "react-i18next";

export default function SettingsPage() {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("settings.title")}>
      <SettingsPageComponent />
    </PageWrapper>
  );
}
