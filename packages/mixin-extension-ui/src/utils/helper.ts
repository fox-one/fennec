import { MutationTypes, AppModuleKey } from "../store/modules/app/types";
import { Asset } from "@foxone/mixin-sdk/types";

export function toast(vue: Vue, data: { message: string; color?: string }) {
  vue.$store.commit(AppModuleKey + MutationTypes.SET_TOAST, {
    show: true,
    ...data
  });
}

export function errorToast(
  vue: Vue,
  error: { description?: string; message?: string; code?: string | number }
) {
  const message = error?.description || error?.message;
  const code = "code" in error ? error.code : "";
  toast(vue, { message: `${code} ${message}`, color: "error" });
}

export function getChainAsset(vm: Vue, asset: Asset) {
  const assets: Asset[] = vm.$store.state.wallet.assets;
  return assets.find((x) => x.asset_id === asset.chain_id);
}

export function onCopySuccess(vm: Vue) {
  toast(vm, {
    message: "Copied",
    color: "info"
  });
}

export function onCopyFail(vm: Vue) {
  toast(vm, {
    message: "Copy failed",
    color: "error"
  });
}
