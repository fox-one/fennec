// import { injectExtension } from "@foxone/mixin-extension-inject";

function handleResponse(data) {
  console.log("handleResponse", data);
}

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

// function inject() {
//   injectExtension(enable, {
//     name: "mixin-client",
//     version: "0.1.0"
//   });
// }
