import { MutationTypes, AppModuleKey } from "../store/modules/app/types";

export function toast(vue: Vue, data: { message: string; color?: string }) {
  vue.$store.commit(AppModuleKey + MutationTypes.SET_TOAST, { show: true, ...data });
}

export function errorToast(vue: Vue, error: { message: string; code: string | number }) {
  const message = `${error.code || ""} ${error.message}`;
  toast(vue, { message, color: "error" });
}
