import { Network } from "@capacitor/network";
import { StatusBar } from "@capacitor/status-bar";
import useDidUpdateEffect from "@hooks/use-did-update-effect";
import { EVENTS, STORAGE_KEYS } from "@static/constants";
import { getUserFromTokens } from "@utils/auth";
import { timeOut } from "@utils/basic";
import { Storage } from "@utils/storage";
import React, { createContext, useContext, useEffect, useMemo, useState } from "react";
import { emit, useListener } from "react-gbus";

interface GlobalStateContextProps {
  initializeStorage;
  user?;
  setUser;
  isLoggedIn: boolean;
  isOnline;

  isLoading?;
  setIsLoading?;
}

interface GlobalStateProviderProps {
  children;
}

const GlobalStateContext = createContext<GlobalStateContextProps>({} as GlobalStateContextProps);

export const GlobalStateProvider = ({ children }: GlobalStateProviderProps) => {
  const [isOnline, setIsOnline] = useState<boolean>(true);
  const [isLoading, setIsLoading] = useState<boolean>();

  const initialUser = useMemo(
    () => getUserFromTokens(Storage.get(STORAGE_KEYS.BATOKEN), Storage.get(STORAGE_KEYS.BRTOKEN)),
    []
  );
  const [user, setUser] = useState<any>(initialUser);

  const isLoggedIn = useMemo(() => !!user.id, [user]);

  useListener(
    ({ BAToken, BRToken }) => {
      const _user = getUserFromTokens(BAToken, BRToken);
      setUser(_user);
    },
    [EVENTS.AUTH.SUCCESS]
  );

  const initializeStorage = async () => {
    const BAToken = Storage.get(STORAGE_KEYS.BATOKEN);
    const BRToken = Storage.get(STORAGE_KEYS.BRTOKEN);

    if (BAToken) {
      emit(EVENTS.AUTH.SUCCESS, { BAToken, BRToken });
    }
  };

  useEffect(() => {
    setNetworkListener();
  }, []);

  const setNetworkListener = async () => {
    try {
      Network.addListener("networkStatusChange", async ({ connected }) => {
        await timeOut();
        setIsOnline(connected);
      });
    } catch (e) {
      console.error(e);
    }
  };

  const handleOnNetworkChange = async () => {
    try {
      if (isOnline) {
        StatusBar.setBackgroundColor({ color: "#34c759" });
        await timeOut();
        StatusBar.setBackgroundColor({ color: "#000000" });
      } else {
        StatusBar.setBackgroundColor({ color: "#ff3b30" });
      }
    } catch (e) {
      console.error("Not device", e);
    }
  };

  useDidUpdateEffect(() => {
    handleOnNetworkChange();
  }, [isOnline]);

  return (
    <GlobalStateContext.Provider
      value={{
        initializeStorage,

        user,
        setUser,
        isOnline,
        isLoggedIn,

        isLoading,
        setIsLoading
      }}
    >
      {children}
    </GlobalStateContext.Provider>
  );
};

export default function useGlobalState() {
  return useContext(GlobalStateContext);
}
