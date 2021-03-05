import { SendMessage } from "./types";
import type { Endpoints } from "@foxone/mixin-sdk/endpoints";

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
}
