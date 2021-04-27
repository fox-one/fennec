import forge from "node-forge";
import jwt from "jsonwebtoken";
import crypto from "crypto";
import { Uint64LE } from "int64-buffer";
import { v4 as uuid } from "uuid";
import crypto_scalarmult from "./ed25519";

export interface KeyPair {
  publicKey: string;
  privateKey: string;
}

export function unix() {
  return Math.floor(new Date().getTime() / 1000);
}

export function generateRSASessionKeyPair(): KeyPair {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 1024, e: 0x10001 });
  const body = forge.asn1
    .toDer(forge.pki.publicKeyToAsn1(keypair.publicKey))
    .getBytes();
  const publicKey = forge.util.encode64(body, 64);
  const privateKey = forge.pki.privateKeyToPem(keypair.privateKey);
  return { publicKey, privateKey };
}

export function generateEd25519SessionKeypair(): KeyPair {
  const keypair = forge.pki.ed25519.generateKeyPair();
  const publicKey = Buffer.from(keypair.publicKey)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  const privateKey = Buffer.from(keypair.privateKey)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
  return { publicKey, privateKey };
}

function toBuffer(content, encoding = "utf8") {
  if (typeof content === "object") content = JSON.stringify(content);
  return Buffer.from(content, encoding as any);
}

function base64url(buffer) {
  return buffer
    .toString("base64")
    .replace(/=/g, "")
    .replace(/\+/g, "-")
    .replace(/\//g, "_");
}

function getEd25519Sign(payload, privateKey) {
  const header = toBuffer({ alg: "EdDSA", typ: "JWT" }).toString("base64");
  payload = base64url(toBuffer(payload));
  const result = [header, payload];
  const sign = base64url(
    Buffer.from(
      forge.pki.ed25519.sign({
        message: result.join("."),
        encoding: "utf8",
        privateKey
      })
    ).toString("base64")
  );
  result.push(sign);
  return result.join(".");
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
  const _privateKey = toBuffer(privateKey, "base64");
  const jwtPayload = {
    uid: clientId,
    sid: sessionId,
    iat: unix(),
    exp: expire,
    jti: uuid(),
    sig: md.digest().toHex(),
    scp: scp || "FULL",
    ...payload
  };

  return _privateKey.length === 64
    ? getEd25519Sign(jwtPayload, _privateKey)
    : jwt.sign(jwtPayload, privateKey, { algorithm: "RS512" });
}

function hexToBytes(hex) {
  const bytes = new Uint8Array(32);
  for (let c = 0; c < hex.length; c += 2) {
    bytes[c / 2] = parseInt(hex.substr(c, 2), 16);
  }
  return bytes;
}

function signRsaPin(pinToken, privateKey, sessionId) {
  pinToken = Buffer.from(pinToken, "base64");
  privateKey = forge.pki.privateKeyFromPem(privateKey);
  const pinKey = privateKey.decrypt(pinToken, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    label: sessionId
  });
  return hexToBytes(forge.util.binary.hex.encode(pinKey));
}

function scalarMult(curvePriv, publicKey) {
  curvePriv[0] &= 248;
  curvePriv[31] &= 127;
  curvePriv[31] |= 64;
  const sharedKey = new Uint8Array(32);
  crypto_scalarmult(sharedKey, curvePriv, publicKey);
  return sharedKey;
}

function privateKeyToCurve25519(privateKey) {
  const seed = privateKey.slice(0, 32);
  const sha512 = crypto.createHash("sha512");
  sha512.write(seed, "binary");
  const digest = sha512.digest();
  digest[0] &= 248;
  digest[31] &= 127;
  digest[31] |= 64;
  return digest.slice(0, 32);
}

function signEd25519PIN(pinToken, privateKey) {
  pinToken = Buffer.from(pinToken, "base64");
  return scalarMult(privateKeyToCurve25519(privateKey), pinToken.slice(0, 32));
}

export function signEncryptedPin(
  pin: string,
  pinToken: string,
  sessionId: string,
  privateKey: string,
  iterator: any = ""
) {
  const blockSize = 16;
  const _privateKey = toBuffer(privateKey, "base64");
  const pinKey =
    _privateKey.length === 64
      ? signEd25519PIN(pinToken, _privateKey)
      : signRsaPin(pinToken, privateKey, sessionId);
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
