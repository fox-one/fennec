import type { SendMessage, InjectedAccount } from "./types";

let sendMessage: SendMessage;

export default class Accounts {
  constructor(_sendMessage: SendMessage) {
    sendMessage = _sendMessage;
  }

  public get(): Promise<InjectedAccount[]> {
    return sendMessage("pub_(accounts.list)");
  }
}
