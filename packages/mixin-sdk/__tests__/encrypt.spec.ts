import {
  signAuthenticationToken,
  generateEd25519SessionKeypair,
  generateRSASessionKeyPair
} from "../src/encrypt";
import forge from "node-forge";
import RSASession from "./keystore/rsa.json";
import Ed25519Session from "./keystore/ed25519.json";

describe("mixin encrypts", () => {
  test("generateRSASessionKeyPair should be valid", () => {
    const keypair = generateRSASessionKeyPair();
    const privateKey = forge.pki.privateKeyFromPem(keypair.privateKey);
    const body = forge.util.decode64(keypair.publicKey).toString();
    const publicKey = forge.pki.publicKeyFromAsn1(forge.asn1.fromDer(body));

    const md = forge.md.sha1.create();
    md.update("sign this", "utf8");
    const signature = privateKey.sign(md);
    const verified = publicKey.verify(md.digest().bytes(), signature);

    expect(verified).toBe(true);
  });

  test("generateEd25519SessionKeypair should be valid", () => {
    const keypair = generateEd25519SessionKeypair();
    const privateKey = Buffer.from(keypair.privateKey, "base64");
    const publicKey = Buffer.from(keypair.publicKey, "base64");
    const message = "test";
    const signature = forge.ed25519.sign({
      message,
      privateKey,
      encoding: "utf8"
    });
    const verified = forge.ed25519.verify({
      message,
      signature,
      publicKey,
      encoding: "utf8"
    });
    expect(verified).toBe(true);
  });

  test("signAuthenticationToken with rsa session", () => {
    const { client_id, session_id, private_key } = RSASession;
    const endpoint = {
      method: "GET",
      uri: "/assets",
      data: ""
    } as const;
    const token = signAuthenticationToken(
      client_id,
      session_id,
      private_key,
      endpoint.method,
      endpoint.uri,
      endpoint.data
    );
    expect(typeof token).toBe("string");
  });

  test("signAuthenticationToken with ed25519 session", () => {
    const { client_id, session_id, private_key } = Ed25519Session;
    const endpoint = {
      method: "GET",
      uri: "/assets",
      data: ""
    } as const;
    const token = signAuthenticationToken(
      client_id,
      session_id,
      private_key,
      endpoint.method,
      endpoint.uri,
      endpoint.data
    );
    expect(typeof token).toBe("string");
  });

  // test("generate authorize token should work as expect", async () => {
  //   const endpoint = {
  //     method: "GET",
  //     uri: "/assets",
  //     data: ""
  //   } as const;

  //   const token = signAuthenticationToken(
  //     configs.client_id,
  //     configs.session_id,
  //     configs.private_key,
  //     endpoint.method,
  //     endpoint.uri,
  //     endpoint.data
  //   );
  //   try {
  //     const response = await axios.request({
  //       url: endpoint.uri,
  //       baseURL: baseURL,
  //       method: endpoint.method,
  //       data: endpoint.data,
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     expect(Array.isArray(response.data.data)).toBe(true);
  //   } catch (error) {
  //     expect(error).toMatch("error");
  //   }
  // }, 300000);

  // test("generate authorize token should work as expect", async () => {
  //   const endpoint = {
  //     method: "GET",
  //     uri: "/snapshots",
  //     data: "",
  //     params: {
  //       offset: "",
  //       limit: 20
  //     }
  //   } as const;

  //   const config = {
  //     url: endpoint.uri,
  //     baseURL: baseURL,
  //     method: endpoint.method,
  //     data: endpoint.data,
  //     params: endpoint.params
  //   };

  //   const token = signAuthenticationToken(
  //     configs.client_id,
  //     configs.session_id,
  //     configs.private_key,
  //     endpoint.method,
  //     axios.getUri(config),
  //     endpoint.data
  //   );

  //   try {
  //     const response = await axios.request({
  //       url: config.url,
  //       method: config.method,
  //       data: config.data,
  //       params: config.params,
  //       baseURL: config.baseURL,
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     expect(Array.isArray(response.data.data)).toBe(true);
  //   } catch (error) {
  //     expect(error).toMatch("error");
  //   }
  // });

  // test("encrypt pin should work as expect", async () => {
  //   const pin = signEncryptedPin(
  //     "593986",
  //     configs.pin_token,
  //     configs.session_id,
  //     configs.private_key
  //   );

  //   const newPin = signEncryptedPin(
  //     "593986",
  //     configs.pin_token,
  //     configs.session_id,
  //     configs.private_key
  //   );

  //   const endpoint = {
  //     method: "POST",
  //     uri: "/pin/update",
  //     data: {
  //       old_pin: pin,
  //       pin: newPin
  //     }
  //   } as const;

  //   const token = signAuthenticationToken(
  //     configs.client_id,
  //     configs.session_id,
  //     configs.private_key,
  //     endpoint.method,
  //     endpoint.uri,
  //     endpoint.data
  //   );

  //   try {
  //     const response = await axios.request({
  //       url: endpoint.uri,
  //       baseURL: baseURL,
  //       method: endpoint.method,
  //       data: endpoint.data,
  //       headers: {
  //         Authorization: `Bearer ${token}`
  //       }
  //     });
  //     console.log(response);
  //     expect(response.data.data.type).toBe("user");
  //   } catch (error) {
  //     expect(error).toMatch("error");
  //   }
  // }, 300000);
});
