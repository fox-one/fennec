import { MutationTypes, AppModuleKey } from "../store/modules/app/types";

export function toast(vue: Vue, data: { message: string; color?: string }) {
  vue.$store.commit(AppModuleKey + MutationTypes.SET_TOAST, {
    show: true,
    ...data
  });
}

export function errorToast(
  vue: Vue,
  error: { message: string; code?: string | number } | Error
) {
  const message = error?.message;
  const code = "code" in error ? error.code : "";
  toast(vue, { message: `${code} ${message}`, color: "error" });
}
