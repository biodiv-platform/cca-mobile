import { ENDPOINT } from "@static/constants";

export const getUserImage = (resourceUrl, w = 50) => {
  return resourceUrl
    ? resourceUrl.startsWith("http")
      ? resourceUrl
      : `${ENDPOINT.FILES_PREVIEW}get/crop/users${resourceUrl}?w=${w}`
    : `/next-assets/user/default-user.svg`;
};

export const getLocalIcon = (icon, type) => `/next-assets/${type}/${icon || "Unknown"}.svg`;
