import "./menu.css";

import { Avatar } from "@chakra-ui/react";
import useGlobalState from "@hooks/use-global-state";
import {
  IonAvatar,
  IonContent,
  IonIcon,
  IonItem,
  IonLabel,
  IonList,
  IonMenu,
  IonMenuToggle
} from "@ionic/react";
import { launchInAppBrowser } from "@utils/basic";
import React from "react";
import { useTranslation } from "react-i18next";
import { useLocation } from "react-router-dom";

import { appPages } from "./pages";

export const Menu: React.FC = () => {
  const location = useLocation();
  const { isLoggedIn, user } = useGlobalState();
  const { t, i18n } = useTranslation();

  return (
    <IonMenu contentId="main" type="overlay" disabled={!isLoggedIn}>
      <IonContent>
        <IonList id="inbox-list">
          <IonMenuToggle autoHide={false}>
            <IonItem className="ion-margin-bottom" routerLink="/profile" routerDirection="none">
              <IonAvatar slot="start">
                <Avatar name={user?.name} />
              </IonAvatar>
              <IonLabel>
                <h3>{user?.name}</h3>
                <p>{user?.email}</p>
              </IonLabel>
            </IonItem>
          </IonMenuToggle>
          {appPages.map((appPage, index) => (
            <IonMenuToggle key={index} autoHide={false}>
              <IonItem
                className={location.pathname === appPage.url ? "selected" : ""}
                {...(appPage.isExternal
                  ? { onClick: () => launchInAppBrowser(appPage.url, i18n.resolvedLanguage) }
                  : { routerLink: appPage.url, routerDirection: "none" })}
                lines="none"
                detail={false}
              >
                <IonIcon slot="start" md={appPage.icon} />
                <IonLabel>{t(appPage.title)}</IonLabel>
              </IonItem>
            </IonMenuToggle>
          ))}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};
