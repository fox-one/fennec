import UIKit from "@foxone/uikit";
import icons from "../utils/icons";

import { mergeDeep } from "vuetify/lib/util/helpers";

const options = {
  icons: {
    values: icons
  },
  theme: {
    dark: true,
    themes: {
      dark: {
        bg_card: "#474264",
        bg_hover: "#5D587B",
        bg: "#393453",
        label: "#BBB7CC",
        text_2: "#78738F",
        primary: "#FA7A4F",
        secondary: "#BBB7CC",
        white: "#FFFFFF",
        // error & warning
        error: "#f44c4c",
        success: "#2CC94E",
        warning: "#F58721",
        info: "#0f65c7"
      }
    }
  }
};

mergeDeep(UIKit.preset, options);

export default mergeDeep(UIKit.preset, options);
