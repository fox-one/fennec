import extension from "extensionizer";
import handler from "@foxone/mixin-extension-base/background";

extension.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener((data) => {
    handler(data, port);
  });
  port.onDisconnect.addListener(() => console.log(`Disconnect from ${port.name}`));
});
