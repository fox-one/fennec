import { signAuthenticationToken, signEncryptedPin } from "./encrypt";
import encryptor from "browser-passworder";

export interface MixinAccount {
  pin?: string;
  pin_token?: string;
  session_id: string;
  private_key: string;
  client_id: string;
}

export default class MixinKeyring {
  accounts: MixinAccount[] = [];

  public static serialize(account: MixinAccount) {
    return new Promise<string>((resolve, reject) => {
      try {
        resolve(JSON.stringify(account));
      } catch (error) {
        reject(error);
      }
    });
  }

  public static deserialize(keystore: string): Promise<MixinAccount> {
    return new Promise<MixinAccount>((resovle, reject) => {
      try {
        resovle(JSON.parse(keystore));
      } catch (error) {
        reject(error);
      }
    });
  }

  public static async decryptFromStored(
    stored: string | undefined,
    password: string
  ): Promise<MixinAccount[]> {
    if (!stored) {
      return [];
    }
    const decrypted: string[] = JSON.parse(
      await encryptor.decrypt(password, stored)
    );
    return await Promise.all(
      decrypted.map(async (x) => await MixinKeyring.deserialize(x))
    );
  }

  public static async getEncryptedPin(
    clientId: string,
    stored: string | undefined,
    password: string
  ) {
    const accounts = await MixinKeyring.decryptFromStored(stored, password);
    const account = accounts.find((x) => x.client_id === clientId);
    if (!account) {
      throw new Error(`Cannot find account for ${clientId}`);
    }
    return Promise.resolve(
      signEncryptedPin(
        account.pin ?? "",
        account.pin_token ?? "",
        account.session_id,
        account.private_key
      )
    );
  }

  public signAuthorizeToken(
    clientId: string,
    method: string,
    uri: string,
    data: any
  ) {
    const account = this.getAccountFor(this.accounts, clientId);
    return Promise.resolve(
      signAuthenticationToken(
        account.client_id,
        account.session_id,
        account.private_key,
        method,
        uri,
        data
      )
    );
  }

  public signClientToken(
    clienId: string,
    method: string,
    uri: string,
    data: any,
    scp: string,
    expire: number,
    payload: any
  ) {
    const account = this.getAccountFor(this.accounts, clienId);
    return Promise.resolve(
      signAuthenticationToken(
        account.client_id,
        account.session_id,
        account.private_key,
        method,
        uri,
        data,
        scp,
        expire,
        payload
      )
    );
  }

  public async restore(stored: string | undefined, password: string) {
    const accounts = await MixinKeyring.decryptFromStored(stored, password);
    this.accounts = accounts.map((account) => {
      return {
        client_id: account.client_id,
        session_id: account.session_id,
        private_key: account.private_key
      };
    });
  }

  public getAccountFor(accounts: MixinAccount[], clientId: string) {
    const account = accounts.find((w) => w.client_id === clientId);
    if (!account) {
      throw `Mixin wallet ${clientId} not found in keyring`;
    }
    return account;
  }

  public async exportAccount(
    clientId: string,
    stored: string | undefined,
    password: string
  ) {
    const accounts = await MixinKeyring.decryptFromStored(stored, password);
    const account = this.getAccountFor(accounts, clientId);
    return Promise.resolve(JSON.stringify(account));
  }

  public async exportAllAccounts(stored: string | undefined, password: string) {
    const accounts = await MixinKeyring.decryptFromStored(stored, password);
    return Promise.resolve(JSON.stringify(accounts));
  }

  public async removeAccount(
    clientId: string,
    stored: string | undefined,
    password: string
  ): Promise<string> {
    let accounts = await MixinKeyring.decryptFromStored(stored, password);
    accounts = accounts.filter((x) => x.client_id !== clientId);
    return JSON.stringify(
      await Promise.all(
        accounts.map(async (x) => await MixinKeyring.serialize(x))
      )
    );
  }

  public async addAccount(
    keystore: string,
    stored: string | undefined,
    password: string
  ) {
    const accounts = await MixinKeyring.decryptFromStored(stored, password);
    const account = await MixinKeyring.deserialize(keystore);
    if (!MixinKeyring.checkAccount(account)) {
      throw new Error("import account is invalid");
    }
    if (accounts.find((x) => x.client_id === account.client_id)) {
      throw new Error(`${account.client_id} has already imported`);
    }
    return JSON.stringify([
      ...(accounts.map((x) => JSON.stringify(x)) || []),
      keystore
    ]);
  }

  public static checkAccount(account) {
    const keys = ["pin", "pin_token", "session_id", "private_key", "client_id"];
    for (const key of keys) {
      if (!account[key] || typeof account[key] !== "string") {
        return false;
      }
    }
    return true;
  }
}
