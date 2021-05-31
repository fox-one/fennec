import Fennec from "@foxone/fennec-dapp/src";
import { RawTransactionRequest } from "@foxone/mixin-api/types";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { defineComponent, toRefs, ref, inject } from "vue";

export function payment(transaction: RawTransactionRequest) {
  return axios.post("https://mixin-api.zeromesh.net/payment", transaction);
}

export default defineComponent({
  name: "Multisgis",

  props: {
    connected: Boolean
  },

  setup(props) {
    const { connected } = toRefs(props);
    const fennec = inject<Fennec>("fennec");
    const receivers = ref(
      "0cc43c5e-4258-4ece-b0ff-d8e719b1d469,17ac525b-5e12-44b0-8f51-5beb8aa1a129"
    );
    const threshold = ref(1);

    const handleReceiversChange = (e: any) =>
      (receivers.value = e.target.value);
    const handleThresholdChange = (e: any) =>
      (threshold.value = e.target.value);

    const requestPayment = async () => {
      const data: RawTransactionRequest = {
        amount: "100",
        asset_id: "965e5c6e-434c-3fa9-b780-c50f43cd955c", // CNB
        memo: "test",
        opponent_multisig: {
          receivers: receivers.value.split(","),
          threshold: threshold.value
        },
        trace_id: uuid()
      };

      // TODO: add resp types
      const resp: any = await fennec?.ctx?.wallet.multisigsGenerate({
        transaction: data
      });

      await fennec?.ctx?.wallet.multisigsPayment({ code: resp.code_id });
    };

    return () => {
      if (!connected.value) {
        return "Please connect to extension";
      }

      return (
        <>
          <input
            class="input"
            placeholder="Receivers split by ,"
            value={receivers.value}
            onInput={handleReceiversChange}
          />
          <input
            class="input mt-1"
            placeholder="Threshold"
            value={threshold.value}
            onInput={handleThresholdChange}
          />
          <button class={"button is-small mt-1"} onClick={requestPayment}>
            Payment
          </button>
        </>
      );
    };
  }
}) as any;
