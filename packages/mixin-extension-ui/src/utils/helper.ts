import { MutationTypes, AppModulePerfix } from "../store/modules/app/types";
import { Asset } from "@foxone/mixin-sdk/types";
import { MixinAsset } from "@foxone/uikit/src/components/FAssetAmountInput/types";

export function toast(vue: Vue, data: { message: string; color?: string }) {
  vue.$store.commit(AppModulePerfix + MutationTypes.SET_TOAST, {
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

export function getChainAsset(vm: Vue, id: string) {
  const assets: Asset[] = vm.$store.state.wallet.assets;
  return assets.find((x) => id === x.asset_id);
}

export function getChainAssetLogo(vm: Vue, id: string) {
  return getChainAsset(vm, id)?.icon_url ?? "";
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

export function debounce(fn: Function, delay: number) {
  let timeoutId = 0 as any;
  return (...args: any[]) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => fn(...args), delay);
  };
}

export function throttle<T extends (...args: any[]) => any>(
  fn: T,
  limit: number
) {
  let throttling = false;
  return (...args: Parameters<T>): void | ReturnType<T> => {
    if (!throttling) {
      throttling = true;
      setTimeout(() => (throttling = false), limit);
      return fn(...args);
    }
  };
}

export function convertToListAsset(vm: Vue, asset: Asset): MixinAsset {
  return {
    id: asset.asset_id,
    symbol: asset.symbol,
    name: asset.name,
    logo: asset.icon_url,
    chainLogo: asset && getChainAssetLogo(vm, asset.chain_id)
  };
}
