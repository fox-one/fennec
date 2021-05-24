import type { SendMessage, InjectedAccount } from "./types";
import type { Endpoints } from "@foxone/mixin-sdk/endpoints";

let sendMessage: SendMessage;
let endpoints: Endpoints;

export default class Accounts {
  constructor(_sendMessage: SendMessage, _endpoints: Endpoints) {
    sendMessage = _sendMessage;
    endpoints = _endpoints;
  }

  public async get(): Promise<InjectedAccount[]> {
    return await sendMessage("pub_(accounts.list)");
  }

  public async current() {
    return await endpoints.getMe();
  }
}
