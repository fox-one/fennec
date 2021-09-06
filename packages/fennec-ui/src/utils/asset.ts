import Vue from "vue";
import { GlobalActions, GlobalGetters } from "../store/types";

import type { Asset } from "@foxone/mixin-api/types";

export function updateAsset(vm: Vue, id: string) {
  if (!id) return;

  setTimeout(() => {
    vm.$store.dispatch(GlobalActions.LOAD_ASSET, id);
  }, 1000);
}

export function convertToListAsset(vm: Vue, asset: Asset | undefined) {
  const getAssetById = vm.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
  const chainAsset = getAssetById(asset?.chain_id);

  if (!chainAsset) {
    vm.$store.dispatch(GlobalActions.LOAD_ASSET, asset?.chain_id);
  }

  return {
    ...asset,
    chainLogo: chainAsset?.icon_url ?? "",
    id: asset?.asset_id ?? "",
    logo: asset?.icon_url ?? "",
    name: asset?.name ?? "",
    symbol: asset?.symbol ?? ""
  };
}

export function getChainAsset(vm: Vue, id: string): Asset | undefined {
  return vm.$store.getters[GlobalGetters.GET_ASSET_BY_ID](id);
}

export function getChainAssetLogo(vm: Vue, id: string): string {
  return getChainAsset(vm, id)?.icon_url ?? "";
}

export function setInitAsset(vm: Vue, preset, init) {
  const getters = vm.$store.getters;
  const assets: Asset[] = getters[GlobalGetters.GET_MERGED_ASSETS];
  const convertToListAsset = vm.$utils.asset.convertToListAsset;

  if (preset) {
    const asset = assets.find((x) => x.asset_id === preset);

    if (asset) {
      return convertToListAsset(vm, asset);
    }
  } else if (!init) {
    return convertToListAsset(vm, assets[0]) || null;
  }

  return null;
}
