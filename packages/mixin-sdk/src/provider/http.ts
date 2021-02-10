/* eslint-disable @typescript-eslint/no-unused-vars */
import type {
  ProviderInterface,
  ProviderInterfaceEmitted,
  ProviderInterfaceEmitCb,
  ProviderInterfaceCallback,
  HttpMethod
} from "../types";
import axios, { AxiosInstance } from "axios";

import DEFAULTS from "../defaults";

export default class HttpProvider implements ProviderInterface {
  #axios: AxiosInstance;

  constructor(
    endpoint: string = DEFAULTS.HTTP_URL,
    headers: Record<string, string> = {}
  ) {
    this.#axios = axios.create({
      headers,
      baseURL: endpoint
    });

    this.#axios.interceptors.response.use((response) => {
      if (response.data.error) {
        return Promise.reject(response.data.error);
      }
      return Promise.resolve(response.data);
    });
  }

  public get hasSubscriptions() {
    return false;
  }

  public get isConnected() {
    return true;
  }

  public get instance() {
    return this.#axios;
  }

  public async connect() {
    // noop
  }

  public async disconnect() {
    // noop
  }

  public clone(): ProviderInterface {
    throw new Error("Unimplemented");
  }

  public on(
    type: ProviderInterfaceEmitted,
    sub: ProviderInterfaceEmitCb
  ): () => void {
    console.error(
      "HTTP Provider does not have 'on' emitters, use WebSockets instead"
    );

    return () => {
      //
    };
  }

  public async send(
    path: string,
    method: HttpMethod,
    body?: Record<string, any>,
    query?: Record<string, string>
  ): Promise<any> {
    const response = await this.#axios.request({
      method,
      url: path,
      data: body,
      params: query
    });

    return response.data;
  }

  public async subscribe(
    types: string,
    method: string,
    params: any[],
    cb: ProviderInterfaceCallback
  ): Promise<number> {
    throw new Error(
      "HTTP Provider does not have subscriptions, use WebSockets instead"
    );
  }

  public async unsubscribe(
    type: string,
    method: string,
    id: number
  ): Promise<boolean> {
    throw new Error(
      "HTTP Provider does not have subscriptions, use WebSockets instead"
    );
  }
}
