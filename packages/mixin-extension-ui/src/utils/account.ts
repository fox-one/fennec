import type { AccountProvider } from "@foxone/mixin-extension-base/state/types";

import { ActionTypes, WalletModulePerfix } from "../store/modules/wallet/types";
import axios from "axios";
import HttpProvider from "@foxone/mixin-sdk/provider/http";
import createEndpoint from "@foxone/mixin-sdk/endpoints";
import {
  signAuthenticationToken,
  signEncryptedPin
} from "@foxone/mixin-sdk/encrypt";
import { EVENTS } from "../defaults";
import {
  generateEd25519SessionKeypair,
  generateRSASessionKeyPair,
  KeyPair
} from "@foxone/mixin-sdk/encrypt";
import Vue from "vue";

export async function selectAccount(vm: Vue, id: string) {
  const selectedAccount = vm.$store.state.preference.preference.selectedAccount;
  if (id === selectedAccount) {
    return;
  }
  await vm.$messages.selectAccount(id);
  vm.$utils.app.loadWalletData(vm);
}

export async function getUser(vm: Vue, id: string, force = false) {
  if (!id) return;
  return await vm.$store.dispatch(WalletModulePerfix + ActionTypes.LOAD_USER, {
    id,
    force
  });
}

export async function confirmPassword(
  vm: Vue,
  callbacks: { onSuccess?: Function; onFail?: Function }
) {
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
) {
  const { provider, walletName, cipherType } = opts;
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

  const { pin_token, pin_token_base64, session_id, user_id } = resp.data.data;

  // create pin for new account
  const randomPin = Math.floor(Math.random() * 1e6).toString();
  const encryptedPin = signEncryptedPin(
    randomPin,
    pin_token,
    session_id,
    keyPair.privateKey
  );
  const http = new HttpProvider();
  const endpoints = createEndpoint(http);
  http.instance.interceptors.request.use(async (config) => {
    const url = axios.getUri(config);
    const token = signAuthenticationToken(
      user_id,
      session_id,
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
      client_id: user_id,
      session_id,
      pin_token: opts.cipherType === "rsa" ? pin_token : pin_token_base64,
      pin: randomPin,
      private_key: keyPair.privateKey
    }),
    password
  );
}
