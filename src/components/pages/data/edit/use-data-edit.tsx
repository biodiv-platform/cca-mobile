import { Spinner } from "@chakra-ui/react";
import { IDB_TABLES } from "@static/indexeddb";
import React, { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router";
import { useIndexedDBStore } from "use-indexeddb";

interface DataEditContextProps {
  data;
  setData;
  template;
}

interface DataEditProviderProps {
  initialData?;
  children;
}

const DataEditContext = createContext<DataEditContextProps>({} as DataEditContextProps);

export const DataEditProvider = ({ children }: DataEditProviderProps) => {
  const params = useParams<any>();
  const id = Number(params.id);

  const [data, setDataI] = useState<any>();
  const [template, setTemplate] = useState<any>();

  const idbData = useIndexedDBStore(IDB_TABLES.DATA);
  const idbPending = useIndexedDBStore(IDB_TABLES.PENDING);
  const idbTemplates = useIndexedDBStore(IDB_TABLES.TEMPLATES);

  useEffect(() => {
    fetchInitialData();
  }, []);

  const fetchInitialTemplate = async (shortName) => {
    const _template = await idbTemplates.getOneByIndex("shortName", shortName);
    setTemplate(_template);
  };

  const fetchInitialData = async () => {
    let _record: any;

    const _pending = await idbPending.getByID(id); // try to find record by `ID` in in `pending`
    if (_pending) {
      _record = _pending;
    } else {
      const _data = await idbData.getByID(id); // if not available in `pending` look up in `data`
      _record = _data;
    }

    if (_record) {
      setDataI(_record);
      fetchInitialTemplate(_record.shortName);
    } else {
      console.error(`can't find #${id} locally`);
    }
  };

  return (
    <DataEditContext.Provider
      value={{
        data,
        setData: setDataI,
        template
      }}
    >
      {data && template ? children : <Spinner />}
    </DataEditContext.Provider>
  );
};

export default function useDataEdit() {
  return useContext(DataEditContext);
}
