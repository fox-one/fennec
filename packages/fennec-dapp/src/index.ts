import {
  InjectProvider,
  InjectedData
} from "@foxone/fennec-base/src/inject/types";
// import { Asset, CreateTransferPayload } from "@foxone/mixin-api/types";
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

  // public async signToken(payload: any) {
  //   return await this.ctx?.wallet.signToken({
  //     payload
  //   });
  // }

  // public async getAssets(): Promise<Asset[] | undefined> {
  //   return await this.ctx?.wallet.getAssets();
  // }

  // public async getAsset(id: string): Promise<Asset | undefined> {
  //   return await this.ctx?.wallet.getAsset(id);
  // }

  // public async transfer(payload: CreateTransferPayload) {
  //   return this.ctx?.wallet.transfer(payload);
  // }

  // public async multisigsPayment(payload: { code: string }) {
  //   return this.ctx?.wallet.multisigsPayment(payload);
  // }
}
