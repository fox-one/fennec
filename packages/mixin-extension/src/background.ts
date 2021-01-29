import extension from "extensionizer";
import createHandler from "@foxone/mixin-extension-base/background";

let handler;

extension.runtime.onConnect.addListener((port) => {
  port.onMessage.addListener(async (data) => {
    if (!handler) {
      handler = await createHandler();
    }
    handler(data, port);
  });

  port.onDisconnect.addListener(() =>
    console.log(`Disconnect from ${port.name}`)
  );
});
