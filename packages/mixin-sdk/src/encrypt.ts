import forge from "node-forge";
import jwt from "jsonwebtoken";
import { Uint64LE } from "int64-buffer";
import { v4 as uuid } from "uuid";

export function unix() {
  return Math.floor(new Date().getTime() / 1000);
}

export function generateSessionKeyPair() {
  const keypair = forge.pki.rsa.generateKeyPair({ bits: 2048, e: 0x10001 });
  const body = forge.asn1.toDer(forge.pki.publicKeyToAsn1(keypair.publicKey)).getBytes();
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
  params: any,
  scp = "FULL"
) {
  if (typeof params === "object") {
    params = JSON.stringify(params);
  } else if (typeof params !== "string") {
    params = "";
  }

  const expire = unix() + 30 * 60;
  const md = forge.md.sha256.create();
  md.update(forge.util.encodeUtf8(method + uri + params));
  const payload = {
    uid: clientId,
    sid: sessionId,
    iat: unix(),
    exp: expire,
    jti: uuid(),
    sig: md.digest().toHex(),
    scp: scp || "FULL"
  };
  return jwt.sign(payload, privateKey, { algorithm: "RS512" });
}

export function signEncryptedPin(pin: string, pinToken: string, sessionId: string, privateKey: string, iterator = "") {
  const blockSize = 16;

  const data = Buffer.from(pinToken, "base64").toString();
  const pinKey = forge.pki.privateKeyFromPem(privateKey).decrypt(data, "RSA-OAEP", {
    md: forge.md.sha256.create(),
    label: sessionId
  });

  const time = [...new Uint64LE(unix()).toBuffer()].reverse();

  if (iterator == undefined || iterator === "") {
    iterator = Date.now() * 1000000 + "";
  }

  let buf = Buffer.concat([Buffer.from(pin, "utf8"), Buffer.from(time), Buffer.from(iterator)]);
  const padding = blockSize - (buf.length % blockSize);
  const paddingArray: number[] = [];
  for (let i = 0; i < padding; i++) {
    paddingArray.push(padding);
  }
  buf = Buffer.concat([buf, Buffer.from(paddingArray)]);

  const iv16 = forge.random.getBytesSync(16);
  const key = forge.util.hexToBytes(forge.util.binary.hex.encode(pinKey));

  const cipher = forge.cipher.createCipher("AES-CBC", key);
  cipher.start({ iv: iv16 });
  cipher.update(forge.util.createBuffer(buf));
  cipher.finish();
  const output = cipher.output;
  const encrypted = Buffer.concat([Buffer.from(iv16), Buffer.from(output.toString())]);
  return Buffer.from(encrypted).toString("base64");
}
