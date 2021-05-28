import type { User } from "@foxone/mixin-api/types";
import type { AccountProvider } from "@foxone/fennec-base/state/types";

import { ActionTypes, WalletModulePerfix } from "../store/modules/wallet/types";
import axios from "axios";
import HttpProvider from "@foxone/mixin-api/provider/http";
import createEndpoint from "@foxone/mixin-api/endpoints";
import {
  signAuthenticationToken,
  signEncryptedPin,
  generateEd25519SessionKeypair,
  generateRSASessionKeyPair,
  KeyPair
} from "@foxone/mixin-api/encrypt";
import { EVENTS } from "../defaults";

import Vue from "vue";

export async function selectAccount(vm: Vue, id: string): Promise<void> {
  const selectedAccount = vm.$store.state.preference.preference.selectedAccount;

  if (id === selectedAccount) {
    return;
  }

  await vm.$messages.selectAccount(id);
  await vm.$utils.app.loadWalletData(vm);
}

export async function getUser(
  vm: Vue,
  id: string,
  force = false
): Promise<User> {
  return await vm.$store.dispatch(WalletModulePerfix + ActionTypes.LOAD_USER, {
    force,
    id
  });
}

export function confirmPassword(
  vm: Vue,
  callbacks: {
    onSuccess?: (password: string) => void;
    onFail?: () => void;
  }
): void {
  vm.$root.$emit(EVENTS.CONFIRM_PASSWORD, callbacks);
}

export async function createAccountFromProvider(
  vm: Vue,
  password: string,
  opts: {
    provider: AccountProvider;
    walletName: string;
    cipherType: "rsa" | "ed25519";
  }
): Promise<void> {
  const { cipherType, provider, walletName } = opts;
  let keyPair: KeyPair;

  if (cipherType === "rsa") {
    keyPair = generateRSASessionKeyPair();
  } else {
    keyPair = generateEd25519SessionKeypair();
  }

  const resp = await axios.post(provider.value, {
    full_name: walletName,
    session_secret: keyPair.publicKey
  });

  const {
    pin_token: pinToken,
    pin_token_base64: pinTokenBase64,
    session_id: sessionId,
    user_id: userId
  } = resp.data.data;

  // create pin for new account
  const randomPin = Math.floor(Math.random() * 1e6).toString();
  const encryptedPin = signEncryptedPin(
    randomPin,
    pinToken,
    sessionId,
    keyPair.privateKey
  );
  const http = new HttpProvider();
  const endpoints = createEndpoint(http);

  http.instance.interceptors.request.use((config) => {
    const url = axios.getUri(config);
    const token = signAuthenticationToken(
      userId,
      sessionId,
      keyPair.privateKey,
      config.method?.toUpperCase() ?? "",
      url,
      config.data ?? ""
    );

    config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

    return config;
  });

  await endpoints.updatePin("", encryptedPin);
  await vm.$messages.createNewAccount(
    JSON.stringify({
      client_id: userId,
      pin: randomPin,
      pin_token: opts.cipherType === "rsa" ? pinToken : pinTokenBase64,
      private_key: keyPair.privateKey,
      session_id: sessionId
    }),
    password
  );
}
