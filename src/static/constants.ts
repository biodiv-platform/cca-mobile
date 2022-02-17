import SITE_CONFIG from "@configs/site-config";

const API_ENDPOINT = SITE_CONFIG.SITE.API_ENDPOINT;

export const ENDPOINT = {
  CCA: `${API_ENDPOINT}cca-api/api`,
  USER: `${API_ENDPOINT}user-api/api`,
  FILES: `${API_ENDPOINT}files-api/api`,
  FILES_PREVIEW: `${SITE_CONFIG.SITE.SITE_URL}files-api/api`,
  INTEGRATOR: `${API_ENDPOINT}integrator-api/api`,
  PAGES: `${API_ENDPOINT}pages-api/api`
};

export const STORAGE_KEYS = {
  BATOKEN: "BAToken",
  BRTOKEN: "BRToken"
};

export const EVENTS = {
  AUTH: {
    SUCCESS: "auth_success"
  },
  SYNC_PARTICIPATIONS: "sync_p"
};

export const VERIFICATION_TYPE = [
  {
    label: "Email",
    value: "EMAIL"
  },
  {
    label: "Mobile",
    value: "MOBILE"
  }
];

export const VERIFICATION_MODE = {
  MANUAL: "manual",
  OAUTH_GOOGLE: "oauth-google"
};

export const FORM_TYPE_OPTIONS = [
  { value: "TEXT", label: "Text Box" },
  { value: "TEXT_AREA", label: "Text Area" },
  { value: "RICHTEXT", label: "Rich Text" },
  { value: "HEADING", label: "Heading" },
  { value: "SINGLE_SELECT", label: "Single Select (Dropdown)" },
  { value: "RADIO", label: "Single Select (Radio)" },
  { value: "MULTI_SELECT", label: "Multiple Select (Dropdown)" },
  { value: "CHECKBOX", label: "Multiple Select (Panel)" },
  { value: "NUMBER", label: "Number" },
  { value: "NUMBER_RANGE", label: "Number Range" },
  { value: "DATE", label: "Date" },
  { value: "DATE_RANGE", label: "Date Range" },
  { value: "YEAR", label: "Year" },
  { value: "FILE", label: "File" },
  { value: "GEOMETRY", label: "Geometry" }
];

export const FORM_TYPE = Object.fromEntries(FORM_TYPE_OPTIONS.map(({ value }) => [value, value]));

export const MINMAX_FORM_TYPES = [FORM_TYPE.NUMBER, FORM_TYPE.NUMBER_RANGE];

export const MINMAX_DATE_FORM_TYPES = [FORM_TYPE.DATE, FORM_TYPE.YEAR, FORM_TYPE.DATE_RANGE];

export const OPTION_FORM_TYPES = [
  FORM_TYPE.SINGLE_SELECT,
  FORM_TYPE.RADIO,
  FORM_TYPE.MULTI_SELECT,
  FORM_TYPE.CHECKBOX
];

export const LICENSES = [
  "UNSPECIFIED",
  "CC-BY",
  "CC-BY-SA",
  "CC-BY-NC",
  "CC-BY-NC-SA",
  "CC-BY-NC-ND",
  "CC-BY-ND",
  "CC-PUBLIC-DOMAIN"
];
