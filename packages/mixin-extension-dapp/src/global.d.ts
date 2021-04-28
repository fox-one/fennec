import type { InjectProvider } from "@foxone/mixin-extension-base/inject/types";

declare global {
  const INJECT_KEY = "mixin_ext";
  export interface Window {
    __MIXIN__?: { [INJECT_KEY]: InjectProvider };
  }
}
