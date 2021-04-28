import type { Session } from "./types";
import type HttpProvider from "./provider/http";

import createEndpoints, { Endpoints } from "./endpoints";
import providers from "./provider";
import axios from "axios";
import * as encrypts from "./encrypt";

export default class Mixin {
  private session: Session | null = null;

  public endpoints: Endpoints;

  public provider: HttpProvider;

  constructor() {
    this.provider = new providers.HttpProvider();
    this.endpoints = createEndpoints(this.provider);
  }

  public config(session: Session) {
    this.session = session;
    this.provider.instance.interceptors.request.use(async (config) => {
      if (!this.session) return config;
      const url = axios.getUri(config);
      const token = encrypts.signAuthenticationToken(
        this.session.client_id,
        this.session.session_id,
        this.session.private_key,
        config.method ?? "",
        url,
        config.data ?? ""
      );
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      return config;
    });
  }
}

export { encrypts, providers, createEndpoints };
