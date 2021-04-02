export type ProviderInterfaceEmitted = "connected" | "disconnected" | "error";

export type ProviderInterfaceEmitCb = (value?: any) => any;

export type ProviderInterfaceCallback = (
  error: Error | null,
  result: any
) => void;

export enum HttpMethod {
  GET = "GET",
  POST = "POST"
}

export interface ProviderInterface {
  readonly hasSubscriptions: boolean;
  readonly isConnected: boolean;

  clone(): ProviderInterface;
  connect(): Promise<void>;
  disconnect(): Promise<void>;
  on(type: ProviderInterfaceEmitted, sub: ProviderInterfaceEmitCb): () => void;

  send(path: string, method: HttpMethod): Promise<any>;
  send(path: string, method: HttpMethod, body: any): Promise<any>;
  send(path: string, method: HttpMethod, body: any, query: any): Promise<any>;

  subscribe(
    type: string,
    method: string,
    params: any[],
    cb: ProviderInterfaceCallback
  ): Promise<number | string>;
  unsubscribe(
    type: string,
    method: string,
    id: number | string
  ): Promise<boolean>;
}

export interface CreateAddressPayload {
  asset_id: string;
  label: string;
  destination: string;
  tag: string;
  pin: string;
}

export interface CreateTransferPayload {
  asset_id: string;
  opponent_id: string;
  amount: string;
  pin?: string;
  trace_id: string;
  memo: string;
}
export interface SnapshotQueryParams {
  limit: number;
  offset: string;
  asset?: string;
  opponent?: string;
  destination?: string;
  tag?: string;
}

export interface WithdrawPayload {
  address_id: string;
  amount: string;
  pin: string;
  trace_id: string;
}

export interface NetworkSnapshotsParams {
  limit: number;
  offset: string;
  asset: string;
  order?: "ASC" | "DESC";
}

export interface MultisigsOutputsParams {
  members?: string;
  threshold?: number;
  state?: "unspent" | "signed" | "spent";
  offset: string;
  limit?: number;
}

export interface MultisigsRequestPayload {
  action: string;
  pin: string;
}

export interface ExternalTransactionParams {
  asset?: string;
  destination?: string;
  tag?: string;
  limit: number;
  offset: string;
}

export interface RelationshipActionPayload {
  user_id: string;
  full_name?: string;
  action: "ADD" | "REMOVE" | "BLOCK" | "UNBLOCK";
}

export interface Asset {
  type: string;
  asset_id: string;
  chain_id: string;
  symbol: string;
  name: string;
  icon_url: string;
  balance: string;
  destination: string;
  tag: string;
  price_btc: string;
  price_usd: string;
  change_btc: string;
  change_usd: string;
  asset_key: string;
  mixin_id: string;
  confirmations: number;
  capitalization: number;
  liquidity?: string;
}

export interface NetworkAsset {
  amount: string;
  asset_id: string;
  chain_id: string;
  icon_url: string;
  name: string;
  snapshots_count: number;
  symbol: string;
  type: string;
}

export interface Transfer {
  type: string;
  snapshot_id: string;
  opponent_id: string;
  asset_id: string;
  amount: string;
  trace_id: string;
  memo: string;
  created_at: string;
}

export enum SnapshotSource {
  DEPOSIT_CONFIRMED = "DEPOSIT_CONFIRMED",
  TRANSFER_INITIALIZED = "TRANSFER_INITIALIZED",
  WITHDRAWAL_INITIALIZED = "WITHDRAWAL_INITIALIZED",
  WITHDRAWAL_FEE_CHARGED = "WITHDRAWAL_FEE_CHARGED",
  WITHDRAWAL_FAILED = "WITHDRAWAL_FAILED"
}

export enum SnapshotType {
  DEPOSIT = "deposit",
  TRANSFER = "transfer",
  WITHDRAWAL = "withdrawal",
  WITHDRAWAL_FEE_CHARGED = "fee",
  WITHDRAWAL_FAILED = "rebate",
  RAW = "raw"
}

export interface NetworkSnapshot {
  amount: string;
  asset: {
    asset_id: string;
    chain_id: string;
    icon_url: string;
    name: string;
    symbol: string;
    type: string;
  };
  created_at: string;
  data: string;
  snapshot_id: string;
  source: SnapshotSource;
  type: SnapshotType;
  // Options only for user (or App) who has access.
  user_id?: string;
  trace_id?: string;
  opponent_id?: string;
}

export interface Snapshot {
  amount: string;
  asset_id: string;
  closing_balance: string;
  counter_user_id: string;
  created_at: string;
  memo: string;
  opening_balance: string;
  opponent_id: string;
  opponent?: string;
  sender?: string;
  snapshot_at: string;
  snapshot_hash: string;
  snapshot_id: string;
  trace_id: string;
  transaction_hash: string;
  type: SnapshotType;
}

export interface Address {
  type: string;
  address_id: string;
  asset_id: string;
  destination: string;
  tag: string;
  label: string;
  fee: string;
  reserve: string;
  dust: string;
  updated_at: string;
}

export interface Withdrawal {
  type: string;
  snapshot_id: string;
  transaction_hash: string;
  asset_id: string;
  amount: string;
  trace_id: string;
  created_at: string;
}

export interface Fee {
  type: string;
  asset_id: string;
  amount: string;
}

export interface User {
  type: string;
  user_id: string;
  identity_number: string;
  session_id: string;
  pin_token: string;
  phone: string;
  full_name: string;
  biography: string;
  avatar_url: string;
  created_at: string;
}

export interface Transaction {
  type: string;
  transaction_id: string;
  transaction_hash: string;
  sender: string;
  amount: string;
  destination: string;
  tag: string;
  asset_id: string;
  chain_id: string;
  confirmations: number;
  threshold: number;
  created_at: string;
}

export interface ExchangeRate {
  code: string;
  rate: string;
}

export interface MultisigUTXO {
  type: string;
  user_id: string;
  utxo_id: string;
  asset_id: string;
  transaction_hash: string;
  output_index: number;
  amount: number;
  threshold: number;
  members: string[];
  memo: string;
  state: string;
  signed_tx: string;
  signed_by: string;
  created_at: string;
  updated_at: string;
}

export interface MultisigRequest {
  type: string;
  request_id: string;
  user_id: string;
  asset_id: string;
  amount: string;
  threshold: string;
  senders: string[];
  receivers: string[];
  signers: string[];
  memo: string;
  action: string;
  state: string;
  transaction_hash: string;
  raw_transaction: string;
  created_at: string;
  code_id: string;
}

export interface Ticker {
  price_btc: string;
  price_usd: string;
  type: string;
}

export interface RawTransactionRequest {
  asset_id: string;
  opponent_multisig: OpponentMultisig;
  amount: string;
  pin?: string;
  trace_id?: string;
  memo?: string;
}

export interface OpponentMultisig {
  receivers: string[];
  threshold: number;
}

export interface RawTransactionPayment {
  amount: string;
  asset_id: string;
  code_id: string;
  created_at: string;
  memo: string;
  receivers: string[];
  status: string;
  threshold: number;
  trace_id: string;
  type: string;
}
