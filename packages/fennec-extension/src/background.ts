import extension from "extensionizer";
import createHandler from "@foxone/fennec-base/background";

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
