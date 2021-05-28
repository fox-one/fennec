import type { Asset } from "@foxone/mixin-api/types";
import type { MixinAsset } from "@foxone/uikit/src/components/FAssetAmountInput/types";

import { MutationTypes, AppModulePerfix } from "../store/modules/app/types";
import Vue from "vue";
import utils from "@foxone/utils";

export function toast(
  vue: Vue,
  data: { message: string; color?: string }
): void {
  vue.$store.commit(AppModulePerfix + MutationTypes.SET_TOAST, {
    show: true,
    ...data
  });
}

export function errorToast(
  vue: Vue,
  error: { description?: string; message?: string; code?: string | number }
): void {
  const message = error?.description || error?.message || "";
  const code = error.code || "";

  toast(vue, { color: "error", message: `${code} ${message}` });
}

export function getChainAsset(vm: Vue, id: string): Asset | undefined {
  const assets = vm.$store.state.wallet.assets as Asset[];

  return assets.find((x) => id === x.asset_id);
}

export function getChainAssetLogo(vm: Vue, id: string): string {
  return getChainAsset(vm, id)?.icon_url ?? "";
}

export function onCopySuccess(vm: Vue): void {
  toast(vm, {
    color: "info",
    message: "Copied"
  });
}

export function onCopyFail(vm: Vue): void {
  toast(vm, {
    color: "error",
    message: "Copy failed"
  });
}

export const debounce = utils.helper.debounce;

export const throttle = utils.helper.throttle;

export function convertToListAsset(vm: Vue, asset: Asset): MixinAsset {
  return {
    chainLogo: asset && getChainAssetLogo(vm, asset.chain_id),
    id: asset.asset_id,
    logo: asset.icon_url,
    name: asset.name,
    symbol: asset.symbol
  };
}

export function isPopup(): boolean {
  return /popup\.html/.test(window.location.href);
}
