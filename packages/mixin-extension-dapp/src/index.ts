import type {
  InjectProvider,
  InjectedData
} from "@foxone/mixin-extension-base/inject/types";
import { CreateTransferPayload } from "@foxone/mixin-sdk/types";
import { INJECT_KEY } from "./defaults";

export class Fennec {
  private ext: InjectProvider | null = null;

  private ctx: InjectedData | null = null;

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

  public async signToken(payload: any) {
    return await this.ctx?.wallet.signToken({
      payload
    });
  }

  public async getAssets() {
    return await this.ctx?.wallet.getAssets();
  }

  public async getAsset(id: string) {
    return await this.ctx?.wallet.getAsset(id);
  }

  public async transfer(payload: CreateTransferPayload) {
    return this.ctx?.wallet.transfer(payload);
  }

  public async multisigsPayment(payload: { code: string }) {
    return this.ctx?.wallet.multisigsPayment(payload);
  }
}
