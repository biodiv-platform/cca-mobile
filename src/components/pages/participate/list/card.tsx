import { ArrowForwardIcon } from "@chakra-ui/icons";
import { Box, Button, Flex } from "@chakra-ui/react";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export default function ContributeFormCard({ form }) {
  const { t } = useTranslation();
  const history = useHistory();

  const handleOnClick = () => history.push(`/participate/form/${form.shortName}`);

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="lg"
      bg="white"
      minH="143px"
    >
      <Flex>
        <Box
          color="gray.600"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mr={2}
        >
          {form.shortName}
        </Box>
      </Flex>
      <Box fontWeight="bold" as="h4" lineHeight="tight" isTruncated>
        {form.name}
      </Box>
      <Box mb={4} isTruncated>
        {form.description}
      </Box>
      <Button
        colorScheme="blue"
        boxShadow={"0 5px 20px 0px var(--chakra-colors-blue-100)"}
        size="sm"
        onClick={handleOnClick}
        rightIcon={<ArrowForwardIcon />}
      >
        {t("participate.title")}
      </Button>
    </Box>
  );
}
