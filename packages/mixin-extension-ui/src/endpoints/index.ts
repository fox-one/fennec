import HttpProvider from "@foxone/mixin-sdk/provider/http";
import createEndpoint from "@foxone/mixin-sdk/endpoints";
import messages from "../messages";

const provider = new HttpProvider();

const endpoints = createEndpoint(provider);

provider.instance.interceptors.request.use(async (config) => {
  const token = await messages.signAuthorizeToken(
    config.url ?? "",
    config.method ?? "",
    config.data ?? ""
  );
  config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
  return config;
});

export default endpoints;
