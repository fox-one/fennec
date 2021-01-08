import zh from "vuetify/es5/locale/zh-Hans";
import en from "vuetify/es5/locale/en";
import ja from "vuetify/es5/locale/ja";
import enUikit from "@foxone/uikit/src/locales/en";
import jaUikit from "@foxone/uikit/src/locales/ja";
import zhUikit from "@foxone/uikit/src/locales/zh-Hans";

export default function({ store }) {
  const isDark = store.state.app?.dark || false;

  return {
    icons: {},
    theme: {
      dark: isDark,
      options: {
        customProperties: true,
      },
    },
    lang: {
      locales: {
        zh: {
          ...zh,
          ...zhUikit,
        },
        en: {
          ...en,
          ...enUikit,
        },
        ja: {
          ...ja,
          ...jaUikit,
        },
      },
    },
  };
}
