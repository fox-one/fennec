import en from "vuetify/es5/locale/en";
import zh from "vuetify/es5/locale/zh-Hans";
import ja from "vuetify/es5/locale/ja";
import en_uikit from "@foxone/uikit/src/locales/en";
import ja_uikit from "@foxone/uikit/src/locales/ja";
import zh_uikit from "@foxone/uikit/src/locales/zh-Hans";

export default {
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      light: {
        accent: "#169CFE",
        primary: "#1EA0FF",
        secondary: "#003d69"
      },
      dark: {
        accent: "#169CFE",
        primary: "#1EA0FF",
        secondary: "#81BEEA"
      }
    }
  },
  lang: {
    locales: {
      zh: {
        ...zh,
        ...zh_uikit
      },
      en: {
        ...en,
        ...en_uikit
      },
      ja: {
        ...ja,
        ...ja_uikit
      }
    }
  }
};
