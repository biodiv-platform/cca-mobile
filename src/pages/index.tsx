import useGlobalState from "@hooks/use-global-state";
import { IonPage } from "@ionic/react";
import React, { useEffect } from "react";
import { useHistory } from "react-router";

export default function IndexPage() {
  const { user, isLoggedIn } = useGlobalState();
  const history = useHistory();

  useEffect(() => {
    history.replace(user.init && isLoggedIn ? "/home" : "/login");
  }, [user.init, isLoggedIn]);

  return <IonPage />;
}
