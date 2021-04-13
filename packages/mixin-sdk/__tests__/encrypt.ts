/* eslint-disable */
import { signAuthenticationToken, signEncryptedPin } from "../src/encrypt";
import axios from "axios";

describe("mixin-sdk/encrypt", () => {
  const configs: any = {};

  const baseURL = "https://mixin-api.zeromesh.net";

  test("", () => {});

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
