import { EditIcon, ExternalLinkIcon } from "@chakra-ui/icons";
import { Box, Button, ButtonGroup, Flex } from "@chakra-ui/react";
import TimeAgo from "@components/core/timeago";
import DeleteIcon from "@icons/delete";
import { launchInAppBrowser } from "@utils/basic";
import { findTitleFromData } from "@utils/field";
import React from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

interface UserContributionCardProps {
  data;
  onDelete?;
  isPending?;
  canEdit?;
}

export default function UserContributionCard({
  data,
  onDelete,
  isPending,
  canEdit
}: UserContributionCardProps) {
  const { t, i18n } = useTranslation();
  const history = useHistory();
  const title = findTitleFromData(data) || "NA";

  const handleOnClick = () => history.push(`/data/edit/${data.id}`);

  const handleOnOpen = () => launchInAppBrowser(`/data/show/${data.id}`, i18n.resolvedLanguage);

  const handleOnDelete = () => {
    if (confirm(t("common.confirm_delete"))) {
      onDelete(data.id);
    }
  };

  return (
    <Box
      p={4}
      borderWidth="1px"
      borderColor="gray.200"
      rounded="lg"
      shadow="lg"
      bg="white"
      minH="120px"
    >
      <Flex>
        <Box
          color="gray.600"
          fontWeight="bold"
          letterSpacing="wide"
          fontSize="xs"
          textTransform="uppercase"
          mb={2}
        >
          {data.shortName}
        </Box>
      </Flex>
      <Box fontWeight="bold" fontSize="xl" mb={3} noOfLines={1}>
        {title}
      </Box>
      <Box mb={3} hidden={isPending}>
        {t("common.created")}: <TimeAgo value={data.createdOn} />
        <br />
        {t("common.updated")}: <TimeAgo value={data.updatedOn} />
      </Box>
      <ButtonGroup colorScheme="blue" size="sm" spacing={4}>
        {canEdit && (
          <Button
            boxShadow={"0 5px 20px 0px var(--chakra-colors-blue-100)"}
            onClick={handleOnClick}
            rightIcon={<EditIcon />}
          >
            {t("common.edit")}
          </Button>
        )}
        {isPending ? (
          <Button
            boxShadow={"0 5px 20px 0px var(--chakra-colors-red-100)"}
            colorScheme="red"
            onClick={handleOnDelete}
            rightIcon={<DeleteIcon />}
          >
            {t("common.delete")}
          </Button>
        ) : (
          <Button
            boxShadow={"0 5px 20px 0px var(--chakra-colors-blue-100)"}
            onClick={handleOnOpen}
            rightIcon={<ExternalLinkIcon />}
          >
            {t("common.view")}
          </Button>
        )}
      </ButtonGroup>
    </Box>
  );
}
