import { add, exit, list, home, settings } from "ionicons/icons";

interface AppPage {
  url: string;
  icon: string;
  title: string;
  isExternal: boolean;
}

export const appPages: AppPage[] = [
  {
    title: "home.title",
    url: "/home",
    icon: home,
    isExternal: false
  },
  {
    title: "participate.title",
    url: "/participate/list",
    icon: add,
    isExternal: false
  },
  {
    title: "cca.list.title",
    url: "/data/list",
    icon: list,
    isExternal: true
  },
  {
    title: "settings.title",
    url: "/settings",
    icon: settings,
    isExternal: false
  },
  {
    title: "auth.logout",
    url: "/logout",
    icon: exit,
    isExternal: false
  }
];
