# @foxone/mixin-sdk

Javascript API for Mixin Network

## Install

```shell
yarn add @foxone/mixin-sdk
```

## Useage

```ts
import { providers, createEnpoints } from "@foxone/mixin-sdk";

// import mixin client sessions
// import sessions from "./session/ed25519.json"
import sessions from "./session/rsa.json"

// create provider instance
const providers = new providers.HttpProvider();
const endpoints = createEndpoints(provider);

// sessions
const { client_id, session_id, private_key } = sessions;
provider.instance.interceptors.request.use(async (config) => {
      const url = axios.getUri(config);
      const token = encrypts.signAuthenticationToken(
        client_id,
        session_id,
        private_key,
        config.method ?? "",
        url,
        config.data ?? ""
      );
      config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
      return config;
});

endpoints.getAssets();
```



