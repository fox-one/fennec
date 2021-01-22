import type { RequestMessage } from "./types/message";
import type { ActionTypes } from "./types";
import type { State } from "../state/types";

import { isExtension } from "../utils/helper";
import createHandlers from "./handlers";
import createState from "../state";

const state: State = createState();
const handlers = createHandlers(state);

export default function handler<T extends ActionTypes>(data: RequestMessage<T>, port: chrome.runtime.Port) {
  const { id, action, payload } = data;
  const isExt = isExtension(port);
  const from = isExt ? "extension" : port.sender?.url || port.sender?.tab?.url || "<unknown>";
  const source = `${from} : ${id} : ${action}`;

  console.log(`[in] ${source}`);

  const promise = isExt
    ? handlers.extension<typeof action>({ id, action, payload, port })
    : handlers.tab({ id, action, payload, port, url: from });

  promise
    .then((res) => {
      console.log(`[out] ${source}:: ${res}`);

      if (!port) {
        throw "Port has been disconnected";
      }

      port.postMessage({ id, res });
    })
    .catch((err) => {
      console.log(`[err] ${source}:: ${err.message}`);
      if (port) {
        port.postMessage({ error: err.message, id });
      }
    });
}
