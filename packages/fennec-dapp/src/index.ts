import { InjectProvider, InjectedData } from "@foxone/fennec-base/inject/types";
import { INJECT_KEY } from "./defaults";

export default class Fennec {
  ext: InjectProvider | null = null;

  ctx: InjectedData | null = null;

  connected = false;

  constructor() {
    if (typeof window !== "undefined") {
      const ext = window?.__MIXIN__?.[INJECT_KEY] ?? null;

      this.ext = ext;
    }
  }

  public get available() {
    return Boolean(this.ext);
  }

  public async connect(origin: string) {
    if (!this.ext) {
      throw new Error("Browser Extension is not installed");
    }

    this.ctx = await this.ext.enable(origin);
    this.connected = true;
  }

  public disconnect() {
    this.ctx = null;
    this.connected = false;
  }
}
