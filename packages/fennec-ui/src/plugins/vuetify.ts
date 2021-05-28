import en from "vuetify/es5/locale/en";
import zh from "vuetify/es5/locale/zh-Hans";
import ja from "vuetify/es5/locale/ja";
import uikitEn from "@foxone/uikit/src/locales/en";
import uikitJa from "@foxone/uikit/src/locales/ja";
import uikitZh from "@foxone/uikit/src/locales/zh-Hans";

export default {
  lang: {
    locales: {
      en: {
        ...en,
        ...uikitEn
      },
      ja: {
        ...ja,
        ...uikitJa
      },
      zh: {
        ...zh,
        ...uikitZh
      }
    }
  },
  theme: {
    dark: false,
    options: {
      customProperties: true
    },
    themes: {
      dark: {
        accent: "#169CFE",
        primary: "#1EA0FF",
        secondary: "#81BEEA"
      },
      light: {
        accent: "#169CFE",
        primary: "#1EA0FF",
        secondary: "#003d69"
      }
    }
  }
};
