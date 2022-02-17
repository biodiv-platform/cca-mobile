import PageWrapper from "@components/core/page-wrapper";
import DataEditComponent from "@components/pages/data/edit";
import { DataEditProvider } from "@components/pages/data/edit/use-data-edit";
import React from "react";
import { useTranslation } from "react-i18next";

export default function DataEditPage() {
  const { t } = useTranslation();

  return (
    <PageWrapper title={t("common.edit")} showBackButton={true}>
      <DataEditProvider>
        <DataEditComponent />
      </DataEditProvider>
    </PageWrapper>
  );
}
