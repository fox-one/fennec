import type { InjectedData } from "@foxone/mixin-extension-base/src/inject/types";
import { RawTransactionRequest } from "@foxone/mixin-sdk/src/types";
import axios from "axios";
import { v4 as uuid } from "uuid";
import { defineComponent, PropType, toRefs, ref, computed } from "vue";

export function payment(transaction: RawTransactionRequest) {
  return axios.post("https://mixin-api.zeromesh.net/payment", transaction);
}

export default defineComponent({
  name: "Multisgis",

  props: {
    connected: Boolean,
    ctx: {
      type: Object as PropType<InjectedData | null>
    }
  },

  setup(props) {
    const { ctx, connected } = toRefs(props);
    const loading = ref(false);
    const receivers = ref(
      "0cc43c5e-4258-4ece-b0ff-d8e719b1d469,17ac525b-5e12-44b0-8f51-5beb8aa1a129"
    );
    const threshold = ref(1);

    const meta = computed(() => {});
    const handleReceiversChange = (e: any) =>
      (receivers.value = e.target.value);
    const handleThresholdChange = (e: any) =>
      (threshold.value = e.target.value);
    const requestPayment = async () => {
      const data: RawTransactionRequest = {
        asset_id: "965e5c6e-434c-3fa9-b780-c50f43cd955c", // CNB
        amount: "100",
        opponent_multisig: {
          receivers: receivers.value.split(","),
          threshold: threshold.value
        },
        memo: "test",
        trace_id: uuid()
      };
      const resp = await ctx?.value?.wallet.multisigsGenerate({
        transaction: data
      });
      await ctx?.value?.wallet.multisigsPayment({ code: resp.code_id });
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
          <button class={`button is-small mt-1`} onClick={requestPayment}>
            Payment
          </button>
        </>
      );
    };
  }
}) as any;
