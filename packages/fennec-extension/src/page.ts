import {
  injectExtension,
  handleResponse,
  enable,
  redirectIfPhishing
} from "@foxone/fennec-base/inject";
import pkg from "../package.json";

window.addEventListener("message", ({ data, source }) => {
  if (source !== window || data.origin !== "content") {
    return;
  }

  if (data.id) {
    handleResponse(data);
  } else {
    console.error("Missing id for response");
  }
});

function inject() {
  injectExtension(enable, {
    name: "mixin_ext",
    version: pkg.version
  });
}

redirectIfPhishing()
  .then((gotRedirected) => {
    if (!gotRedirected) {
      inject();
    }
  })
  .catch((e) => {
    console.warn(
      `Unable to determine if the site is in the phishing list: ${
        (e as Error).message
      }`
    );
    inject();
  });
