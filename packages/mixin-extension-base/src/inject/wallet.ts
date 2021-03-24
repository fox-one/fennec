import { SendMessage } from "./types";
import type { Endpoints } from "@foxone/mixin-sdk/endpoints";
import type { CreateTransferPayload } from "@foxone/mixin-sdk/types";
import type { SignClientTokenPayload } from "../background/types/wallet";

let sendMessage: SendMessage;
let endpoints: Endpoints;

export default class Wallet {
  constructor(_sendMessage: SendMessage, _endpoints: Endpoints) {
    sendMessage = _sendMessage;
    endpoints = _endpoints;
  }

  public async getAsset(id: string) {
    return await endpoints.getAsset(id);
  }

  public async getAssets() {
    return await endpoints.getAssets();
  }

  public async transfer(payload: CreateTransferPayload) {
    return await sendMessage("pub(transfer.request)", payload);
  }

  public async signToken(payload: SignClientTokenPayload) {
    return await sendMessage("pub(token.sign)", payload);
  }
}
