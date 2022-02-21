import {
  IonButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonIcon,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
  useIonRouter
} from "@ionic/react";
import { arrowBack } from "ionicons/icons";
import React from "react";
import { useTranslation } from "react-i18next";

interface PageWrapperProps {
  title;
  children;
  showBackButton?;
}

export default function PageWrapper({ title, children, showBackButton }: PageWrapperProps) {
  const { goBack } = useIonRouter();
  const { t } = useTranslation();

  const confirmBack = () => {
    if (confirm(t("form.back_message"))) {
      goBack();
    }
  };

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons slot="start">
            {showBackButton ? (
              <IonButton shape="round" onClick={confirmBack}>
                <IonIcon icon={arrowBack} />
              </IonButton>
            ) : (
              <IonMenuButton />
            )}
          </IonButtons>
          <IonTitle>{title}</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent fullscreen>{children}</IonContent>
    </IonPage>
  );
}
