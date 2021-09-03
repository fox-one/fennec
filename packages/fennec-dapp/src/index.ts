import { InjectProvider, InjectedData } from "@foxone/fennec-base/inject/types";
import { INJECT_KEY } from "./defaults";

export default class Fennec {
  ctx: InjectedData | undefined;

  connected = false;

  getExt(): InjectProvider | undefined {
    return window?.__MIXIN__?.[INJECT_KEY];
  }

  public isAvailable() {
    return Boolean(this.getExt());
  }

  public async connect(origin: string) {
    if (!this.getExt()) {
      throw new Error("Browser Extension is not installed");
    }

    this.ctx = await this.getExt()?.enable(origin);
    this.connected = true;
  }

  public disconnect() {
    this.ctx = undefined;
    this.connected = false;
  }
}
