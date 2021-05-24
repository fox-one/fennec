// import Mixin, { createEndpoints, encrypts, providers } from "../src";
// import RSASession from "./keystore/rsa.json";
// import Ed25519Session from "./keystore/ed25519.json";
// import axios from "axios";

describe("mixin sdk contents", () => {
  test("OK", () => {
    //
  });
});

// describe("mixin sdk contents", () => {
//   test("encrypts should be exported", () => {
//     expect(typeof encrypts.generateEd25519SessionKeypair).toBe("function");
//     expect(typeof encrypts.generateRSASessionKeyPair).toBe("function");
//     expect(typeof encrypts.signAuthenticationToken).toBe("function");
//   });

//   test("endpoints should work properly with rsa session", async (done) => {
//     const { client_id, session_id, private_key } = RSASession;

//     const provider = new providers.HttpProvider();
//     provider.instance.interceptors.request.use(async (config) => {
//       const url = axios.getUri(config);
//       const token = encrypts.signAuthenticationToken(
//         client_id,
//         session_id,
//         private_key,
//         config.method ?? "",
//         url,
//         config.data ?? ""
//       );
//       config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
//       return config;
//     });

//     const endpoints = createEndpoints(provider);
//     try {
//       const res = await endpoints.getAssets();
//       expect(Array.isArray(res)).toBe(true);
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   test("endponts should work properly with ed25519 session", async (done) => {
//     const { client_id, session_id, private_key } = Ed25519Session;
//     const provider = new providers.HttpProvider();
//     provider.instance.interceptors.request.use(async (config) => {
//       const url = axios.getUri(config);
//       const token = encrypts.signAuthenticationToken(
//         client_id,
//         session_id,
//         private_key,
//         config.method ?? "",
//         url,
//         config.data ?? ""
//       );
//       config.headers = { ...config.headers, Authorization: `Bearer ${token}` };
//       return config;
//     });

//     const endpoints = createEndpoints(provider);
//     try {
//       const res = await endpoints.getAssets();
//       expect(Array.isArray(res)).toBe(true);
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });

//   test("mixin api should work properly", async (done) => {
//     const mixin = new Mixin();
//     mixin.config(RSASession);

//     try {
//       await mixin.endpoints.getAssets();
//       done();
//     } catch (error) {
//       done(error);
//     }
//   });
// });
