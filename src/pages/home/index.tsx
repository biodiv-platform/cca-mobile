import PageWrapper from "@components/core/page-wrapper";
import HomePageComponent from "@components/pages/home";
import React from "react";
import { useTranslation } from "react-i18next";

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("home.title")}>
      <HomePageComponent />
    </PageWrapper>
  );
}
