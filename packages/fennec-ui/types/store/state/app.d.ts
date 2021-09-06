declare namespace State {
  import type { Location } from "vue-router";

  export type AppBar = {
    title: string;
    show: boolean;
    back: boolean;
  };

  export type Paying = {
    visible: boolean;
    timer: null | NodeJS.Timer;
  };

  export type AppLayout = "cover" | "popup" | "desktop" | "desktop-open";

  export type Currency = string;

  export type ColorStyle = "green_up_red_down" | "green_down_red_up";

  export type Settings = {
    currency: Currency;
    colorStyle: ColorStyle;
    dark: boolean;
    provider: string;
  };

  export type AppState = {
    initing: boolean;
    breadcrumbs: Location[];
    appbar: AppBar;
    layout: AppLayout;
    settings: Settings;
  };
}
