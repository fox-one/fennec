import forge from "node-forge";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Uint64LE } from "int64-buffer";
import { v4 as uuid } from "uuid";

export function unix() {
  return Math.floor(new Date().getTime() / 1000);
}

export function generateSessionKeyPair() {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const body = forge.asn1
    .toDer(forge.pki.publicKeyToAsn1(keypair.publicKey))
    .getBytes();
  const public_key = forge.util.encode64(body, 64);
  const private_key = forge.pki.privateKeyToPem(keypair.privateKey);
  return { public: public_key, private: private_key };
}

export function signAuthenticationToken(
  clientId: string,
  sessionId: string,
  privateKey: string,
  method: string,
  uri: string,
  data: any,
  scp = "FULL",
  expire = unix() + 30 * 60,
  payload = {}
) {
  if (typeof data === "object") {
    data = JSON.stringify(data);
  } else if (typeof data !== "string") {
    data = "";
  }

  const md = forge.md.sha256.create();
  md.update(forge.util.encodeUtf8(method.toUpperCase() + uri + data));
  return jwt.sign(
    {
      uid: clientId,
      sid: sessionId,
      iat: unix(),
      exp: expire,
      jti: uuid(),
      sig: md.digest().toHex(),
      scp: scp || "FULL",
      ...payload
    },
    privateKey,
    { algorithm: "RS512" }
  );
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(32);
  for (let c = 0; c < hex.length; c += 2) {
    bytes[c / 2] = parseInt(hex.substr(c, 2), 16);
  }
  return bytes;
}

function signPin(pinToken, privateKey, sessionId) {
  pinToken = Buffer.from(pinToken, "base64");
  privateKey = forge.pki.privateKeyFromPem(privateKey);
  const pinKey = privateKey.decrypt(pinToken, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    label: sessionId
  });
  return hexToBytes(forge.util.binary.hex.encode(pinKey));
}

export function signEncryptedPin(
  pin: string,
  pinToken: string,
  sessionId: string,
  privateKey: string,
  iterator: any = ""
) {
  const blockSize = 16;
  const pinKey = signPin(pinToken, privateKey, sessionId);
  const time = new Uint64LE((Date.now() / 1000) | 0).toBuffer();
  if (iterator == undefined || iterator === "") {
    iterator = Date.now() * 1000000;
  }
  iterator = new Uint64LE(iterator).toBuffer();
  const _pin = Buffer.from(pin, "utf8");
  let buf = Buffer.concat([_pin, Buffer.from(time), Buffer.from(iterator)]);
  const padding = blockSize - (buf.length % blockSize);
  const paddingArray: number[] = [];
  for (let i = 0; i < padding; i++) {
    paddingArray.push(padding);
  }
  buf = Buffer.concat([buf, Buffer.from(paddingArray)]);
  const iv16 = crypto.randomBytes(16);
  const cipher = crypto.createCipheriv("aes-256-cbc", pinKey, iv16);
  cipher.setAutoPadding(false);
  let encrypted_pin_buff = cipher.update(buf as any, "utf-8");
  encrypted_pin_buff = Buffer.concat([iv16, encrypted_pin_buff]);
  return Buffer.from(encrypted_pin_buff).toString("base64");
}
