import extension from "extensionizer";

const port = extension.runtime.connect({ name: "content" });

port.onMessage.addEventListener(data => {
  window.postMessage({ ...data, origin: "conent" }, "*");
});

window.addEventListener("message", ({ data, source }) => {
  if (source != window || data.origin !== "page") {
    return;
  }

  port.postMessage(data);
});

// inject our data injector
const script = document.createElement("script");

script.src = extension.extension.getURL("page.js");

script.onload = (): void => {
  // remove the injecting tag when loaded
  if (script.parentNode) {
    script.parentNode.removeChild(script);
  }
};

(document.head || document.documentElement).appendChild(script);
