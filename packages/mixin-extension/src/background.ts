import extension from "extensionizer";
import createHandler from "@foxone/mixin-extension-base/background";

extension.runtime.onConnect.addListener((port) => {
  createHandler().then((handler) => {
    port.onMessage.addListener((data) => {
      handler(data, port);
    });
  });

  port.onDisconnect.addListener(() => console.log(`Disconnect from ${port.name}`));
});
