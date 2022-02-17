import PageWrapper from "@components/core/page-wrapper";
import UserProfileComponent from "@components/pages/profile";
import React from "react";
import { useTranslation } from "react-i18next";

export default function ProfilePage() {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("user.profile.title")}>
      <UserProfileComponent />
    </PageWrapper>
  );
}
