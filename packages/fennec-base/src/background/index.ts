import type { RequestMessage } from "./types/message";
import type { ActionTypes } from "./types";
import type { State } from "../state/types";

import { isExtension } from "../utils/helper";
import createHandlers from "./handlers";
import createState from "../state";

export default async function () {
  const state: State = await createState();
  const handlers = createHandlers(state);

  return function handler<T extends ActionTypes>(
    data: RequestMessage<T>,
    port: chrome.runtime.Port
  ) {
    const { action, id, payload } = data;
    const isExt = isExtension(port);
    const from = isExt
      ? "extension"
      : port.sender?.url || port.sender?.tab?.url || "<unknown>";

    const promise = isExt
      ? handlers.extension<typeof action>({ action, id, payload, port })
      : handlers.tab({ action, id, payload, port, url: from });

    promise
      .then((res) => {
        if (!port) {
          throw new Error("Port has been disconnected");
        }

        port.postMessage({ id, res });
      })
      .catch((err) => {
        if (port) {
          port.postMessage({ error: err.message, id });
        }
      });
  };
}
