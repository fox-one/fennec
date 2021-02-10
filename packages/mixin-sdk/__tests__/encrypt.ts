import { signAuthenticationToken, signEncryptedPin } from "../src/encrypt";
import axios from "axios";
import endpoints from "@foxone/mixin-extension-ui/endpoints";

describe("mixin-sdk/encrypt", () => {
  const configs = {
    pin: "593986",
    client_id: "77d5959a-a507-4f22-8eaf-77cab38c4852",
    client_secret:
      "5cde18aacaec94cd70166ecdbd126e137e7cfc5a6b38b64e0fe290bae6d0f77c",
    session_id: "1c824311-6eb6-44e6-b161-864f6f5afa76",
    pin_token:
      "KzeLNIPFdRh0KrIBYTWWLBzI8SLTJiiUeB00/Mbuk7B1evzMj79CIdED0oU09DfyTu+LPJzI7O1Wo6+2pkDW8pegi1CUvfiXGk6XPogWKdXABhTa/uOy2aiGyh/GzAMTdhACl1DFLOqBMeKqHSwdNLpNs6y3PpWQbpvmyqhm+n8=",
    private_key:
      "-----BEGIN RSA PRIVATE KEY-----\r\nMIICXQIBAAKBgQCVaaGZz6efYmWnDJjM7WhuIxpnQv3qilqKbqv44eEyOmVIqzmm\r\n5btOfK8LMQCoBrRO6D41lHqPeXRCtWjsxT4U1EBouyiGZRf/IV6UOInLbUvVxQeQ\r\nL6Qx1X5UJ7nTXtw4w1VdBi+eWs9MyCS06t9gEPAXcbotF8EccxaAQ44lCQIDAQAB\r\nAoGAYQEMpyTXijZDExqtldbJB0CJIuOuoPikYd4KjvJv18FsAqsQKhha7FEtAFIX\r\nP//iTpyfzv+QNtg+sBTBg39nlvYQk6uA3vSFjRwA5O3XCugdX+lm2OJgkQRrHtVp\r\nhDLHeW9sAN3g/mxa8ek3+JGWTaC5U1rzicIErnWgHAIEyoECQQDN6XX6huYScq+b\r\ncK8wi4FVARLltrqEsbT7XHHd4VQLY2mUrAMbToGXOw09PSkTjSNQtJ+mxe/fStT4\r\n3FtjP7QxAkEAucHYvgRTYVpvtWZxic63vxB0SnwZJgUZxVsyTMeZXr+81RDY0Gzb\r\nodwiAx3gmwL90TMJyKNocL6erhrS6VCAWQJBAMG1cCSXxVbzhxpO3rBnfOrP0MxD\r\no6HzX5PcOs6GDL+N7SRM0btdlnIDvoeuwra+3ssssMh+ixNf3YykGGD86/ECQGgN\r\nnQK725USGrcrfngqcqU1a1756wBwJQJ3VlLKEDCSCQ31FO6Tu+gMLoU+bD2IzHMu\r\nOtHIL03QiYSPhAury2kCQQCmYC6hswi8a5imAwquzZDg/H2ynDILXL9W8oXrUzb3\r\n+F0ClFu7U+4uu9uKVBBgd1IM4Ddum3MTtbGrQ9Ysnczm\r\n-----END RSA PRIVATE KEY-----\r\n"
  };

  const baseURL = "https://mixin-api.zeromesh.net";

  test("generate authorize token should work as expect", async () => {
    const endpoint = {
      method: "GET",
      uri: "/assets",
      data: ""
    } as const;

    const token = signAuthenticationToken(
      configs.client_id,
      configs.session_id,
      configs.private_key,
      endpoint.method,
      endpoint.uri,
      endpoint.data
    );
    try {
      const response = await axios.request({
        url: endpoint.uri,
        baseURL: baseURL,
        method: endpoint.method,
        data: endpoint.data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      expect(Array.isArray(response.data.data)).toBe(true);
    } catch (error) {
      expect(error).toMatch("error");
    }
  }, 300000);

  test("generate authorize token should work as expect", async () => {
    const endpoint = {
      method: "GET",
      uri: "/snapshots",
      data: "",
      params: {
        offset: "",
        limit: 20
      }
    } as const;

    const config = {
      url: endpoint.uri,
      baseURL: baseURL,
      method: endpoint.method,
      data: endpoint.data,
      params: endpoint.params
    };

    const token = signAuthenticationToken(
      configs.client_id,
      configs.session_id,
      configs.private_key,
      endpoint.method,
      axios.getUri(config),
      endpoint.data
    );
  });

  test("encrypt pin should work as expect", async () => {
    const pin = signEncryptedPin(
      "593986",
      configs.pin_token,
      configs.session_id,
      configs.private_key
    );

    const newPin = signEncryptedPin(
      "593986",
      configs.pin_token,
      configs.session_id,
      configs.private_key
    );

    const endpoint = {
      method: "POST",
      uri: "/pin/update",
      data: {
        old_pin: pin,
        pin: newPin
      }
    } as const;

    const token = signAuthenticationToken(
      configs.client_id,
      configs.session_id,
      configs.private_key,
      endpoint.method,
      endpoint.uri,
      endpoint.data
    );

    try {
      const response = await axios.request({
        url: endpoint.uri,
        baseURL: baseURL,
        method: endpoint.method,
        data: endpoint.data,
        headers: {
          Authorization: `Bearer ${token}`
        }
      });
      console.log(response);
      expect(response.data.data.type).toBe("user");
    } catch (error) {
      expect(error).toMatch("error");
    }
  }, 300000);
});
