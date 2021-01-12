import Vue from "vue";
import Vuetify from "vuetify/lib/framework";
import UIKit from "@foxone/uikit";

const options = {
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
  }
};

export default function() {
  Vue.use(Vuetify);
  Vue.use(UIKit);

  return new Vuetify(options);
}
