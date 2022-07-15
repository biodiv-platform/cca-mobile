import "@ionic/react/css/core.css";
import "@ionic/react/css/normalize.css";
import "@ionic/react/css/structure.css";
import "@ionic/react/css/typography.css";
import "@ionic/react/css/padding.css";
import "@ionic/react/css/float-elements.css";
import "@ionic/react/css/text-alignment.css";
import "@ionic/react/css/text-transformation.css";
import "@ionic/react/css/flex-utils.css";
import "@ionic/react/css/display.css";
import "./theme/variables.css";

import "./theme/global.css";
import "@translations/i18n";

import { ChakraProvider } from "@chakra-ui/react";
import { Menu } from "@components/core/menu";
import { GlobalLoading } from "@components/core/spinner";
import { customTheme } from "@configs/theme";
import { GlobalStateProvider } from "@hooks/use-global-state";
import { ParticipationsProvider } from "@hooks/use-participations";
import { IonApp, IonRouterOutlet, IonSplitPane, setupIonicReact } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import DataEditPage from "@pages/data/edit";
import HomePage from "@pages/home";
import IndexPage from "@pages/index";
import LoginPage from "@pages/auth/login";
import LogoutPage from "@pages/auth/logout";
import SettingsPage from "@pages/settings";
import ParticipateFormPage from "@pages/participate/form";
import ParticipateListPage from "@pages/participate/list";
import ParticipateSavedPage from "@pages/participate/saved";
import ProfilePage from "@pages/profile";
import { IDB_CONFIG } from "@static/indexeddb";
import React from "react";
import BusProvider from "react-gbus";
import { Route, Switch } from "react-router";
import IndexedDBProvider from "use-indexeddb";

setupIonicReact({ mode: "md" });

const IonReactRouterI: any = IonReactRouter;

const App: React.FC = () => (
  <IonApp>
    <IonReactRouterI>
      <IndexedDBProvider config={IDB_CONFIG} loading="loading...">
        <BusProvider>
          <GlobalStateProvider>
            <ParticipationsProvider>
              <ChakraProvider theme={customTheme}>
                <GlobalLoading />

                <IonSplitPane contentId="main">
                  <Menu />

                  <IonRouterOutlet id="main">
                    <Switch>
                      <Route path="/" exact={true}>
                        <IndexPage />
                      </Route>

                      <Route path="/login" exact={true}>
                        <LoginPage />
                      </Route>
                      <Route path="/logout" exact={true}>
                        <LogoutPage />
                      </Route>
                      <Route path="/profile" exact={true}>
                        <ProfilePage />
                      </Route>

                      <Route path="/home" exact={true}>
                        <HomePage />
                      </Route>
                      <Route path="/settings" exact={true}>
                        <SettingsPage />
                      </Route>

                      <Route path="/participate/list" exact={true}>
                        <ParticipateListPage />
                      </Route>
                      <Route path="/participate/saved/:success/:id" exact={true}>
                        <ParticipateSavedPage />
                      </Route>
                      <Route path="/participate/form/:shortName" exact={true}>
                        <ParticipateFormPage />
                      </Route>
                      <Route path="/data/edit/:id" exact={true}>
                        <DataEditPage />
                      </Route>
                    </Switch>
                  </IonRouterOutlet>
                </IonSplitPane>
              </ChakraProvider>
            </ParticipationsProvider>
          </GlobalStateProvider>
        </BusProvider>
      </IndexedDBProvider>
    </IonReactRouterI>
  </IonApp>
);

export default App;
