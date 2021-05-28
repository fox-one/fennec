import { Message } from "@foxone/fennec-base/types";
import extension from "extensionizer";

const port = extension.runtime.connect({ name: "content" });

// send any messages from the extension back to the page
port.onMessage.addListener((data) => {
  console.log("post message to window");

  window.postMessage({ ...data, origin: "content" }, "*");
});

// all messages from the page, pass them to the extension
window.addEventListener("message", ({ data, source }: Message) => {
  console.log("post message to port", data);

  if (source !== window || data.origin !== "page") {
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
