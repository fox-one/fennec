import Vue from "vue";
import axios from "axios";
import cheerio from "cheerio";
import utils from "@foxone/utils";

export function errorToast(
  vm: Vue,
  error: { description?: string; message?: string; code?: string | number }
): void {
  const message = error?.description || error?.message || "";
  const code = error.code || "";

  vm.$uikit.toast.error({ message: `${code} ${message}` });
}

export function onCopySuccess(vm: Vue): void {
  vm.$uikit.toast.success({ message: "Copied" });
}

export function onCopyFail(vm: Vue): void {
  vm.$uikit.toast.error({ message: "Copy failed" });
}

export function isPopup(): boolean {
  return (
    /popup\.html/.test(window.location.href) ||
    /notification\.html/.test(window.location.href)
  );
}

export async function getLinkIcon(host) {
  const resp = await axios.get(`https://${host}`);
  const $ = cheerio.load(resp.data);
  const href = $("link[rel=icon]").attr("href");

  if (!href) {
    return "";
  }

  const icon =
    href.startsWith("http") || href.startsWith("data:")
      ? href
      : `https://${host}${href}`;

  return icon;
}

export const debounce = utils.helper.debounce;

export const throttle = utils.helper.throttle;
