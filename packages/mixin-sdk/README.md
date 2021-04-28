# @foxone/mixin-sdk

Javascript API for Mixin Network



## Install

```shell
yarn add @foxone/mixin-sdk
```



## Useage

* config mixin session

```ts
import Mixin from "@foxone/mixin-sdk";

const mixin = new Mixin();

// config RSA session or ED25519 session
const session = {...}
mixin.config(session)

const assets = await mixin.endpoints.getAssets()
```

* use custom auth action

```ts
import Mixin, { encrypts } from "@foxone/mixin-sdk"

const mixin = new Mixin();

mixin.provider.instance.interceptors.request.use(async (config) => {
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
})

const assets = await mixin.endpoints.getAssets()
```



## TODO

- [ ] custom provider
- [ ] websocket provider
- [ ] API Completion

