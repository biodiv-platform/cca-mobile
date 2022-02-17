import { SimpleGrid } from "@chakra-ui/layout";
import { Skeleton } from "@chakra-ui/skeleton";
import PageWrapper from "@components/core/page-wrapper";
import useParticipations from "@hooks/use-participations";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

import ContributeFormCard from "./card";

export default function ParticipateListComponent() {
  const [isLoading, setIsLoading] = useState(false);
  const [forms, setForms] = useState<any[]>([]);
  const { t } = useTranslation();
  const { pullData, pullTemplates } = useParticipations();

  const fetchTemplates = async () => {
    setIsLoading(true);

    await pullData();

    const _templates = await pullTemplates();
    setForms(_templates);

    setIsLoading(false);
  };

  useEffect(() => {
    fetchTemplates();
  }, []);

  return (
    <PageWrapper title={t("participate.title")} showBackButton={false}>
      <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4 }} spacing={4} p={4}>
        {isLoading
          ? new Array(3)
              .fill(0)
              .map((_, index) => <Skeleton key={index} borderRadius="md" h="143px" />)
          : forms.map((form) => <ContributeFormCard key={form.id} form={form} />)}
      </SimpleGrid>
    </PageWrapper>
  );
}
