import { extension } from "extensionizer";

function handlers(data, port) {
  console.log(data, port);
}

extension.runtime.onConnect.addListener(port => {
  port.onMessage.addListener(data => handlers(data, port));
  port.onDisconnect.addListener(() => console.log(`Disconnect from ${port.name}`));
});
