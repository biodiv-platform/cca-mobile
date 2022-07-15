import { ExternalLinkIcon } from "@chakra-ui/icons";
import {
  Avatar,
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SimpleGrid,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs
} from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import useParticipations from "@hooks/use-participations";
import { IDB_TABLES } from "@static/indexeddb";
import { launchInAppBrowser } from "@utils/basic";
import notification, { NotificationType } from "@utils/notification";
import React, { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import { useIndexedDBStore } from "use-indexeddb";

import UserContributionCard from "./card";

export default function UserParticipations() {
  const [data, setData] = useState<any>([]);
  const [pending, setPending] = useState<any>([]);
  const [templates, setTemplates] = useState<any>([]);
  const { user } = useGlobalState();
  const { t, i18n } = useTranslation();
  const { tryAllDataSync } = useParticipations();
  const [isLoading, setIsLoading] = useState<boolean>();

  const idbData = useIndexedDBStore(IDB_TABLES.DATA);
  const idbPending = useIndexedDBStore(IDB_TABLES.PENDING);
  const idbTemplates = useIndexedDBStore(IDB_TABLES.TEMPLATES);

  const getAllData = async () => {
    const _data = await idbData.getAll();
    setData(_data);

    const _templates: any = await idbTemplates.getAll();
    setTemplates(_templates.map((t) => t.shortName));

    const _pending = await idbPending.getAll();
    setPending(_pending);
  };

  const handleOnSyncAll = async () => {
    setIsLoading(true);
    const success = await tryAllDataSync();
    if (success) {
      notification(t("cca.pending.synced"), NotificationType.Success);
    } else {
      notification(t("cca.pending.failed"));
    }
    getAllData();
    setIsLoading(false);
  };

  const handleOnDelete = async (id) => {
    await idbPending.deleteByID(id);
    getAllData();
  };

  useEffect(() => {
    getAllData();
  }, []);

  return (
    <div>
      <Box bg="gray.50">
        <Flex px={4} py={6} gap={4} w="full" alignItems="center">
          <Avatar size="lg" name={user?.name} />
          <Box overflow="hidden">
            <Heading fontSize="xl">{user?.name}</Heading>
            <Box pt={1} noOfLines={1}>
              {user?.email}
            </Box>
          </Box>
        </Flex>
        <ButtonGroup size="sm" colorScheme="blue" px={4} mb={6}>
          <Button
            onClick={() => launchInAppBrowser(`/user/show/${user.id}`, i18n.resolvedLanguage)}
            rightIcon={<ExternalLinkIcon />}
          >
            {t("user.profile.view_full")}
          </Button>
        </ButtonGroup>
      </Box>

      <Tabs isFitted>
        <TabList bg="gray.50" px={4}>
          <Tab>
            ⌛ {t("user.profile.pending")} ({pending.length})
          </Tab>
          <Tab>
            ✔️ {t("user.profile.uploaded")} ({data.length})
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>
            <Button
              colorScheme="blue"
              isDisabled={pending.length === 0}
              isLoading={isLoading}
              loadingText={t("cca.pending.syncing")}
              onClick={handleOnSyncAll}
              w="full"
              mb={4}
            >
              {t("cca.pending.sync_now")}
            </Button>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4 }} spacing={4}>
              {pending.map((data) => (
                <UserContributionCard
                  key={data.id}
                  data={data}
                  onDelete={handleOnDelete}
                  isPending={true}
                  canEdit={templates.includes(data.shortName)}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
          <TabPanel>
            <SimpleGrid columns={{ base: 1, sm: 1, md: 3, lg: 4 }} spacing={4}>
              {data.map((data) => (
                <UserContributionCard
                  key={data.id}
                  data={data}
                  isPending={false}
                  canEdit={templates.includes(data.shortName)}
                />
              ))}
            </SimpleGrid>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </div>
  );
}
