import { AccountProvider } from "@foxone/mixin-extension-base/state/types";
import { ActionTypes, WalletModulePerfix } from "../store/modules/wallet/types";
import axios from "axios";
import HttpProvider from "@foxone/mixin-sdk/provider/http";
import createEndpoint from "@foxone/mixin-sdk/endpoints";
import {
  signAuthenticationToken,
  signEncryptedPin
} from "@foxone/mixin-sdk/encrypt";
import { EVENTS } from "../defaults";
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
  const resp = await axios.post(provider.value, {
    wallet_name: walletName,
    cipher_type: cipherType
  });
  const keystore = resp.data.keystore;

  // create pin for new account
  const randomPin = Math.floor(Math.random() * 1e6).toString();
  const encryptedPin = signEncryptedPin(
    randomPin,
    keystore.pin_token,
    keystore.session_id,
    keystore.private_key
  );
  const http = new HttpProvider();
  const endpoints = createEndpoint(http);
  http.instance.interceptors.request.use(async (config) => {
    const url = axios.getUri(config);
    const token = signAuthenticationToken(
      keystore.client_id,
      keystore.session_id,
      keystore.private_key,
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
      ...keystore,
      pin: randomPin
    }),
    password
  );
}
