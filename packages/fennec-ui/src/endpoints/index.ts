import messages from "../messages";
import axios from "axios";
import Mixin from "@foxone/mixin-api";

const mixin = new Mixin();

mixin.provider.instance.interceptors.request.use(async (config) => {
  const url = axios.getUri(config);
  const token = await messages.signAuthorizeToken(
    url,
    config.method ?? "",
    config.data ?? ""
  );

  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };

  return config;
});

export default mixin.endpoints;
