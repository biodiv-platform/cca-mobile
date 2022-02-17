import { ArrowForwardIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import useParticipations from "@hooks/use-participations";
import { launchInAppBrowser } from "@utils/basic";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";
import LanguageChooser from "../settings/language-chooser";

export default function HomePageComponent() {
  const { t, i18n } = useTranslation();
  const { pullData, pullTemplates } = useParticipations();

  useEffect(() => {
    pullData();
    pullTemplates();
  }, []);

  return (
    <Box p={4}>
      <div className="login-logo">
        <img src="/assets/icon/logo.png" className="logo" alt="Logo" />
      </div>

      <Heading mb={4}>{t("home.welcome")}</Heading>

      <Text mb={4}>{t("home.mission")}</Text>

      <ButtonGroup colorScheme="blue" spacing={4} mb={4}>
        <Link to="/participate/list">
          <Button rightIcon={<ArrowForwardIcon />}>{t("participate.title")}</Button>
        </Link>
        <Button
          onClick={() => launchInAppBrowser("/", i18n.resolvedLanguage)}
          rightIcon={<ExternalLinkIcon />}
        >
          {t("common.know_more")}
        </Button>
      </ButtonGroup>

      <LanguageChooser />
    </Box>
  );
}
