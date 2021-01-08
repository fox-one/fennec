export function errorHandler(
  vue: Vue,
  error: { message: string; code: string | number },
) {
  const $toast = vue.$utils.helper.toast;
  const fallback = "Unknown Error";
  const message = `${error.code || ""} ${error.message || fallback}`;
  $toast(vue, { message, color: "error" });
}

export function toast(vue: Vue, data: { message: string; color?: string }) {
  vue.$store.commit("app/toast", data);
}
