declare namespace State {
  export interface AppBarState {
    style: "home" | "nav";
    title: string;
    show: boolean;
    back: boolean;
    color: string;
    extension?: null | any;
    extensionHeight?: number;
  }
}
