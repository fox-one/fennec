export interface Message extends MessageEvent {
  data: {
    error?: string;
    id: string;
    origin: string;
    res?: string;
    subscription?: string;
  };
}

export interface BizError extends Error {
  code: number;
}

interface BizErrorConstructor {
  new (message?: string, code?: number): Error;
  (message?: string): Error;
  readonly prototype: Error;
}

declare const BizError: BizErrorConstructor;
