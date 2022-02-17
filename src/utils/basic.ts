import { Storage } from "./storage";
import { STORAGE_KEYS } from "@static/constants";
import SITE_CONFIG from "@configs/site-config";
import { Browser } from "@capacitor/browser";

export const timeOut = async (ms = 1000) => {
  await new Promise((resolve) => setTimeout(resolve, ms));
};

export const launchInAppBrowser = (url, lang) => {
  Browser.open({ url: `${SITE_CONFIG.SITE.SITE_URL}${lang}${url}?preview` });
};

export const launchInAppBrowserWithToken = (url, lang) => {
  const accessToken = Storage.get(STORAGE_KEYS.BATOKEN);
  Browser.open({ url: `${SITE_CONFIG.SITE.SITE_URL}api/go?t=${accessToken}&u=/${lang}${url}` });
};
