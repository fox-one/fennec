export interface Message extends MessageEvent {
  data: {
    error?: string;
    id: string;
    origin: string;
    res?: string;
    subscription?: string;
  };
}
