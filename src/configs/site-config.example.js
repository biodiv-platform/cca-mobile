const SITE_CONFIG_EXAMPLE = {
  CCA: {
    FEATURED_IDS: [],
    TITLE_FIELD_IDS: []
  },
  LANG: {
    DEFAULT: "en",
    DEFAULT_ID: 205,
    LIST: {
      en: {
        id: 205,
        name: "English"
      },
      hi: {
        id: 206,
        name: "Hindi"
      }
    }
  },
  MAP: {
    CENTER: {
      latitude: 20.46,
      longitude: 79.1,
      zoom: -0.1
    },
    COUNTRY: "IN"
  },
  REGISTER: {
    MOBILE: true
  },
  SITE: {
    API_ENDPOINT: "http://localhost:8010/proxy/",
    ICON: "/logo.svg",
    SITE_URL: "https://staging.communityconservedareas.org/",
    URL: "http://localhost:3000"
  },
  TEMPLATE: {
    MAIN: "master"
  },
  TOKENS: {
    GMAP: "x",
    OAUTH_GOOGLE: "x.apps.googleusercontent.com"
  }
};

export default SITE_CONFIG_EXAMPLE;
