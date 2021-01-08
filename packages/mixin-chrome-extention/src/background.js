/* eslint-disable no-unused-vars */
browser.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  console.log("Hello from the background");
});
