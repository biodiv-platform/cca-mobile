import {
  axGetAllData,
  axGetAllTemplates,
  axSaveContribution,
  axUpdateContribution
} from "@services/cca.service";
import { EVENTS } from "@static/constants";
import { IDB_TABLES } from "@static/indexeddb";
import { syncPendingResources } from "@utils/image";
import React, { createContext, useContext } from "react";
import { emit } from "react-gbus";
import { useTranslation } from "react-i18next";
import { useIndexedDBStore } from "use-indexeddb";

import useGlobalState from "./use-global-state";

interface ParticipationsContextProps {
  trySingleDataSync;
  tryAllDataSync;

  pullData;
  pullTemplates;
}

interface ParticipationsProviderProps {
  children;
}

const ParticipationsContext = createContext<ParticipationsContextProps>(
  {} as ParticipationsContextProps
);

export const ParticipationsProvider = ({ children }: ParticipationsProviderProps) => {
  const { i18n } = useTranslation();
  const { user } = useGlobalState();
  const idbData = useIndexedDBStore(IDB_TABLES.DATA);
  const idbPending = useIndexedDBStore(IDB_TABLES.PENDING);
  const idbTemplates = useIndexedDBStore(IDB_TABLES.TEMPLATES);

  const trySingleDataSync = async (payload) => {
    const _payload = {
      ...payload,
      isPending: undefined,
      id: payload.isPending ? undefined : payload.id
    };

    // upload pending resources
    const _pendingResources = await syncPendingResources(payload);
    if (!_pendingResources.success) {
      idbPending.add(payload);
      return _pendingResources;
    }

    // resource upload success -> try to save/update data
    const reqFunc = payload.isPending ? axSaveContribution : axUpdateContribution;
    const r = await reqFunc(_payload);

    if (r.success) {
      await idbPending.deleteByID(payload.id);
      await idbData.update(r.data);

      return r;
    } else {
      await idbPending.update(payload);

      return { ...r, data: payload };
    }
  };

  const tryAllDataSync = async () => {
    const _pending = await idbPending.getAll();
    for (const _p of _pending as any) {
      const { success } = await trySingleDataSync(_p);

      if (success) {
        emit(EVENTS.SYNC_PARTICIPATIONS, { id: _p.id, success });
      } else {
        return false;
      }
    }

    return true;
  };

  const pullData = async () => {
    // fetch all user's data for offline editing
    const allData = await axGetAllData({ language: i18n.resolvedLanguage, userId: user.id });
    if (allData.success) {
      await idbData.deleteAll();

      for (const _data of allData.data) {
        await idbData.update(_data);
      }

      return allData.data;
    }

    const _data = await idbData.getAll();
    return _data;
  };

  const pullTemplates = async () => {
    const { success, data } = await axGetAllTemplates(i18n.resolvedLanguage);
    if (success) {
      await idbTemplates.deleteAll();

      for (const template of data) {
        await idbTemplates.update(template);
      }
      return data;
    }

    const _templates = await idbTemplates.getAll();
    return _templates;
  };

  return (
    <ParticipationsContext.Provider
      value={{
        trySingleDataSync,
        tryAllDataSync,

        pullData,
        pullTemplates
      }}
    >
      {children}
    </ParticipationsContext.Provider>
  );
};

export default function useParticipations() {
  return useContext(ParticipationsContext);
}
