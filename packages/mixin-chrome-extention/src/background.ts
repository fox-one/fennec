import { runtime } from "extensionizer";

runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Hello from the background");
});
