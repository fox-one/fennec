import type {
  ProviderInterface,
  CreateAddressPayload,
  CreateTransferPayload,
  SnapshotQueryParams,
  NetworkSnapshotsParams,
  MultisigsOutputsParams,
  ExternalTransactionParams,
  WithdrawPayload,
  MultisigsRequestPayload,
  Asset,
  NetworkAsset,
  Withdrawal,
  User,
  Transfer,
  Snapshot,
  Address,
  Fee,
  Ticker,
  MultisigUTXO,
  MultisigRequest,
  Transaction,
  ExchangeRate,
  RelationshipActionPayload,
  NetworkSnapshot,
  RawTransactionRequest,
  RawTransactionPayment,
  UpdateProfilePayload
} from "./types";

import { HttpMethod } from "./types";

function createProvider(provider: ProviderInterface) {
  return {
    createUser(secret: string, name: string): Promise<User> {
      return provider.send("/users", HttpMethod.POST, {
        session_secret: secret,
        full_name: name
      });
    },

    updatePin(oldPin: string, newPin: string): Promise<User> {
      return provider.send("/pin/update", HttpMethod.POST, {
        old_pin: oldPin,
        pin: newPin
      });
    },

    getAssets: (): Promise<Asset[]> => {
      return provider.send("/assets", HttpMethod.GET);
    },

    getAsset: (id: string): Promise<Asset> => {
      return provider.send(`/assets/${id}`, HttpMethod.GET);
    },

    transfer(opts: CreateTransferPayload): Promise<Transfer> {
      return provider.send("/transfers", HttpMethod.POST, opts);
    },

    getSnapshots(opts: SnapshotQueryParams): Promise<Snapshot[]> {
      return provider.send("/snapshots", HttpMethod.GET, "", opts);
    },

    getAssetWithdrawAddresses(assetId: string): Promise<Address[]> {
      return provider.send(`/assets/${assetId}/addresses`, HttpMethod.GET);
    },

    createWithdrawAddress(opts: CreateAddressPayload): Promise<Withdrawal> {
      return provider.send("/addresses", HttpMethod.POST, opts);
    },

    deleteWithdrawAddress(id: string) {
      return provider.send(`/addresses/${id}/delete`, HttpMethod.POST);
    },

    getWithdrawAddress(id: string) {
      return provider.send(`/addresses/${id}`, HttpMethod.GET);
    },

    withdraw(opts: WithdrawPayload): Promise<Withdrawal> {
      return provider.send("/withdrawals", HttpMethod.POST, opts);
    },

    getFee(assetId: string): Promise<Fee> {
      return provider.send(`/assets/${assetId}/fee`, HttpMethod.GET);
    },

    codes(code: string) {
      return provider.send(`/codes/${code}`, HttpMethod.GET);
    },

    transactions(opts: RawTransactionRequest) {
      return provider.send("/transactions", HttpMethod.POST, opts);
    },

    payments(opts: RawTransactionRequest): Promise<RawTransactionPayment> {
      return provider.send("/payments", HttpMethod.POST, opts);
    },

    // Multisigs
    getMultisigsOutputs(opts: MultisigsOutputsParams): Promise<MultisigUTXO> {
      return provider.send("/multisigs/outputs", HttpMethod.GET, "", opts);
    },

    createMultisigs(opts: MultisigsRequestPayload): Promise<MultisigRequest> {
      return provider.send(`/multisigs/requests`, HttpMethod.POST, opts);
    },

    multisigsAction(
      id: string,
      action: string,
      pin: string
    ): Promise<MultisigRequest> {
      return provider.send(
        `/multisigs/requests/${id}/${action}`,
        HttpMethod.POST,
        { action, pin }
      );
    },

    // Network
    getNetworkSnapshots(opts: NetworkSnapshotsParams): Promise<Snapshot[]> {
      return provider.send("/network/snapshots", HttpMethod.GET, "", opts);
    },

    getNetworkSnapshot(id: string): Promise<NetworkSnapshot> {
      return provider.send(`/network/snapshots/${id}`, HttpMethod.GET);
    },

    getExternalTransactions(
      opts: ExternalTransactionParams
    ): Promise<Transaction[]> {
      return provider.send("/external/transactions", HttpMethod.GET, "", opts);
    },

    getNetworkTopAssets(): Promise<Asset[]> {
      return provider.send(`/network/assets/top`, HttpMethod.GET);
    },

    getNetworkAsset(id: string): Promise<NetworkAsset> {
      return provider.send(`/network/assets/${id}`, HttpMethod.GET);
    },

    searchNetworkAsset(str: string): Promise<Asset[]> {
      return provider.send(`/network/assets/search/${str}`, HttpMethod.GET);
    },

    getExchangeRates(): Promise<ExchangeRate[]> {
      return provider.send("/fiats", HttpMethod.GET);
    },

    // Bot
    getMe(): Promise<User> {
      return provider.send("/me", HttpMethod.GET);
    },

    updateProfile(opts: UpdateProfilePayload) {
      return provider.send("/me", HttpMethod.POST, opts);
    },

    getUser(id: string): Promise<User> {
      return provider.send(`/users/${id}`, HttpMethod.GET);
    },

    relationships(opts: RelationshipActionPayload) {
      return provider.send("relationships", HttpMethod.POST, opts);
    },

    searchUser(str: string): Promise<User> {
      return provider.send(`/search/${str}`, HttpMethod.GET);
    },

    getFriends(): Promise<User[]> {
      return provider.send("/friends", HttpMethod.GET);
    },

    getBlockingUsers(): Promise<User[]> {
      return provider.send("/blocking_users", HttpMethod.GET);
    },

    getSnapshot(id: string): Promise<Snapshot> {
      return provider.send(`/snapshots/${id}`, HttpMethod.GET);
    },

    ticker(opts: { asset: string; offset: string }): Promise<Ticker> {
      return provider.send(`/ticker`, HttpMethod.GET, "", opts);
    }
  };
}

export default createProvider;

export type Endpoints = ReturnType<typeof createProvider>;
