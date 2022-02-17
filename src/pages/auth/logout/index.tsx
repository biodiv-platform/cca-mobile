import useGlobalState from "@hooks/use-global-state";
import { Storage } from "@utils/storage";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router";

export default function LogoutPage() {
  const history = useHistory();
  const { t } = useTranslation();
  const { setUser } = useGlobalState();

  useEffect(() => {
    if (confirm(t("common.confirm"))) {
      Storage.clear();
      setUser({ init: true });
      history.replace("/login");
    } else {
      history.goBack();
    }
  }, []);

  return <div></div>;
}
