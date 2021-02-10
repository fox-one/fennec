import type { SignAuthorizeTokenPlayload } from "../background/types/keyring";

import HttpProvider from "@foxone/mixin-sdk/provider/http";
import createEndPoints from "@foxone/mixin-sdk/endpoints";
import KeyringState from "./keyring";
import PreferenceState from "./preference";

export type EndPoints = ReturnType<typeof createEndPoints>;

export type EndPointTypes = keyof EndPoints;

export type EndPointPayloads = {
  [K in keyof EndPoints]: Parameters<EndPoints[K]>;
};

export type EndPointResponses = {
  [K in keyof EndPoints]: ReturnType<EndPoints[K]>;
};

export default class ProviderState {
  #keyring: KeyringState;

  #preference: PreferenceState;

  public endpoints: EndPoints;

  constructor(opts: { keyring: KeyringState; preference: PreferenceState }) {
    this.#keyring = opts.keyring;
    this.#preference = opts.preference;

    const provider = new HttpProvider();
    provider.instance.interceptors.request.use((config) => {
      const selectedAccount = this.#preference.preference.seletedAccount;
      if (selectedAccount) {
        const payload: SignAuthorizeTokenPlayload = {
          clientId: selectedAccount,
          method: (config.method ?? "").toUpperCase(),
          data: config.data,
          uri: config.url ?? ""
        };
        const token = this.#keyring.signAuthorizeToken(payload);
        config.headers = { ...config.headers, Authorization: token };
      }
      return config;
    });

    this.endpoints = createEndPoints(provider);
  }
}
