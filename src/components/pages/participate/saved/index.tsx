import { CheckCircleIcon, ExternalLinkIcon, WarningTwoIcon } from "@chakra-ui/icons";
import { Flex, Button, ButtonGroup, Heading, Text } from "@chakra-ui/react";
import { launchInAppBrowser } from "@utils/basic";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory, useParams } from "react-router-dom";

export default function ParticipationSavedComponent() {
  const params: any = useParams();
  const history = useHistory();
  const { t, i18n } = useTranslation();

  const success = params.success === "true";

  return (
    <Flex textAlign="center" py={10} px={6} h="100vh" alignItems="center">
      <div>
        {success ? (
          <CheckCircleIcon boxSize="50px" color="green.500" />
        ) : (
          <WarningTwoIcon boxSize="50px" color="orange.300" />
        )}
        <Heading as="h2" size="lg" mt={6} mb={2}>
          {success ? t("form.saved.success.title") : t("form.saved.error.title")}
        </Heading>
        <Text color="gray.500" mb={4}>
          {success ? t("form.saved.success.description") : t("form.saved.error.description")}
        </Text>
        <ButtonGroup colorScheme="blue">
          <Button onClick={() => history.push("/home")}>{t("home.title")}</Button>
          {success && (
            <Button
              onClick={() => launchInAppBrowser(`/data/show/${params.id}`, i18n.resolvedLanguage)}
              rightIcon={<ExternalLinkIcon />}
            >
              {t("common.view")}
            </Button>
          )}
        </ButtonGroup>
      </div>
    </Flex>
  );
}
