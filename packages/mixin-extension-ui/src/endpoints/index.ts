import HttpProvider from "@foxone/mixin-sdk/provider/http";
import createEndpoint from "@foxone/mixin-sdk/endpoints";
import messages from "../messages";
import axios from "axios";

const provider = new HttpProvider();

const endpoints = createEndpoint(provider);

provider.instance.interceptors.request.use(async (config) => {
  const url = axios.getUri(config);
  const token = await messages.signAuthorizeToken(
    url,
    config.method ?? "",
    config.data ?? ""
  );
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

export default endpoints;
