import axios, { AxiosRequestConfig, AxiosInstance } from "axios";

export default class AxiosClient {
  instance: AxiosInstance;

  constructor(defaults, requestInterceptors, responseInterceptors) {
    this.instance = axios.create(defaults);
    for (const interceptor of requestInterceptors) {
      this.instance.interceptors.request.use(...interceptor);
    }
    for (const interceptor of responseInterceptors) {
      this.instance.interceptors.response.use(...interceptor);
    }
  }

  config(options: AxiosRequestConfig) {
    this.instance.defaults.baseURL = options.baseURL;
  }

  async request(options: AxiosRequestConfig): Promise<any> {
    const res = await this.instance.request(options);
    return Promise.resolve(res);
  }

  post(url: string, options: AxiosRequestConfig = {}) {
    const config = {
      url,
      method: "post",
      ...options,
    } as AxiosRequestConfig;
    return this.request(config);
  }

  put(url: string, options: AxiosRequestConfig = {}) {
    const config = {
      url,
      method: "put",
      ...options,
    } as AxiosRequestConfig;
    return this.request(config);
  }

  patch(url: string, options: AxiosRequestConfig = {}) {
    const config = {
      url,
      method: "patch",
      ...options,
    } as AxiosRequestConfig;
    return this.request(config);
  }

  get(url: string, options: AxiosRequestConfig = {}): Promise<any> {
    const config = {
      url,
      method: "get",
      ...options,
    } as AxiosRequestConfig;
    return this.request(config);
  }

  delete(url: string, options: AxiosRequestConfig = {}): Promise<any> {
    const config = {
      url,
      method: "delete",
      ...options,
    } as AxiosRequestConfig;
    return this.request(config);
  }
}
