import type { ActionPayloads, ActionTypes, ActionResponses } from "./index";

export type RequestMessage<T extends ActionTypes> = {
  id: string;
  action: T;
  origin: "page" | "extension";
  payload?: ActionPayloads[T];
};

export type ResponseMessage<T extends ActionTypes> = {
  error?: string;
  id: string;
  res?: ActionResponses[T];
  subscription?: unknown;
};
