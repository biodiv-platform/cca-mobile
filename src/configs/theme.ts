import { extendTheme } from "@chakra-ui/react";

const defaultFontFamily =
  "-apple-system,BlinkMacSystemFont,Segoe UI,Inter,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji";

export const customTheme = extendTheme({
  fonts: {
    body: defaultFontFamily,
    heading: defaultFontFamily
  },
  fontWeights: {
    bold: 600
  },
  colors: {
    blue: {
      "50": "#e6fffa",
      "100": "#b2f5ea",
      "200": "#81e6d9",
      "300": "#4fd1c5",
      "400": "#38b2ac",
      "500": "#319795",
      "600": "#2c7a7b",
      "700": "#285e61",
      "800": "#234e52",
      "900": "#1d4044"
    }
  }
});
