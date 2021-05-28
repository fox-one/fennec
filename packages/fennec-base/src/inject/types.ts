import {
  User,
  Asset,
  CreateTransferPayload,
  RawTransactionRequest
} from "@foxone/mixin-api/types";
import { SignClientTokenPayload } from "@foxone/fennec-base/background/types/wallet";
import type {
  ActionPayloads,
  ActionTypesWithNoSubscriptions,
  ActionResponses,
  ActionTypesWithNullPayload,
  ActionTypesWithSubscriptions,
  SubscriptionMessageTypes
} from "../background/types";

export interface Handler {
  resolve: (data?: unknown) => void;
  reject: (error: Error) => void;
  subscriber?: (data: unknown) => void;
}

export type Handlers = Record<string, Handler>;

export interface SendMessage {
  <T extends ActionTypesWithNullPayload>(action: T): Promise<
    ActionResponses[T]
  >;
  <T extends ActionTypesWithNoSubscriptions>(
    action: T,
    payload: ActionPayloads[T]
  ): Promise<ActionResponses[T]>;
  <T extends ActionTypesWithSubscriptions>(
    action: T,
    payload: ActionPayloads[T],
    subscriber: (data: SubscriptionMessageTypes[T]) => void
  ): Promise<ActionResponses[T]>;
}

export interface InjectedExtensionInfo {
  name: string;
  version: string;
}

export type InjectOptions = InjectedExtensionInfo;

export interface InjectedAccount {
  clientId: string;
}

export interface InjectedAccounts {
  get(): Promise<InjectedAccount[]>;
  current(): Promise<User>;
}

export interface InjectedWallet {
  getAsset(id: string): Promise<Asset>;
  getAssets(): Promise<Asset[]>;
  transfer(payload: CreateTransferPayload): Promise<null>;
  signToken(payload: SignClientTokenPayload): Promise<string>;
  multisigsPayment(payload: { code: string }): Promise<boolean>;
  multisigsGenerate(payload: {
    transaction: RawTransactionRequest;
  }): Promise<unknown>;
}

export interface InjectedData {
  accounts: InjectedAccounts;
  wallet: InjectedWallet;
}

type This = typeof globalThis;

export interface InjectProvider {
  enable: (origin: string) => Promise<InjectedData>;
  version: string;
}

export interface InjectedWindow extends This {
  __MIXIN__: Record<string, InjectProvider>;
}
