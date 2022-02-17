import PageWrapper from "@components/core/page-wrapper";
import { LoginPageComponent } from "@components/pages/login";
import React from "react";
import { useTranslation } from "react-i18next";

export default function LoginPage() {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("auth.login")}>
      <LoginPageComponent />
    </PageWrapper>
  );
}
