import { ArrowBackIcon, ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, SimpleGrid } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";

interface FormNavigationProps {
  tabIndex;
  setTabIndex;
  totalSize;
  children?;
}

export function FormNavigation({
  tabIndex,
  setTabIndex,
  totalSize,
  children
}: FormNavigationProps) {
  const { t } = useTranslation();

  const navigate = (i) => {
    document.getElementById("s-tabs")?.scrollIntoView({ behavior: "smooth" });
    setTabIndex(tabIndex + i);
  };

  const onBackClicked = () => {
    if (confirm(t("form.back_message"))) {
      navigate(-1);
    }
  };

  return (
    <Box p={4}>
      <SimpleGrid columns={2} spacing={4} mb={4}>
        <Button
          colorScheme="blue"
          isFullWidth={true}
          isDisabled={tabIndex === 0}
          onClick={onBackClicked}
          leftIcon={<ArrowBackIcon />}
          size="sm"
        >
          {t("common.prev")}
        </Button>
        <Button
          colorScheme="blue"
          isFullWidth={true}
          isDisabled={tabIndex === totalSize - 1}
          onClick={() => navigate(1)}
          leftIcon={<ArrowForwardIcon />}
          size="sm"
        >
          {t("common.next")}
        </Button>
      </SimpleGrid>
      {children}
    </Box>
  );
}
