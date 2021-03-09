import type { InjectedData } from "@foxone/mixin-extension-base/src/inject/types";
import { CreateTransferPayload } from "@foxone/mixin-sdk/src/types";
import { defineComponent, PropType, toRefs, ref, computed } from "vue";
import { v4 as uuid } from "uuid";

export default defineComponent({
  name: "Transfer",

  props: {
    connected: Boolean,
    ctx: {
      type: Object as PropType<InjectedData | null>
    }
  },

  setup(props) {
    const { ctx, connected } = toRefs(props);
    const loading = ref(false);

    const meta = computed(() => {
      return {
        text: "",
        classes: `${loading.value ? "is-loading" : ""}`
      };
    });

    const requestTransfer = async () => {
      loading.value = true;
      try {
        const payload: CreateTransferPayload = {
          asset_id: "965e5c6e-434c-3fa9-b780-c50f43cd955c", // CNB
          amount: "100",
          opponent_id: "5467e9ea-cd04-4b91-b84c-93a0c87cb6a4", // divisey
          memo: "test",
          trace_id: uuid()
        };
        const res = await ctx?.value?.wallet.transfer(payload);
      } catch (error) {
        console.log(error);
      }
      loading.value = false;
    };

    return () => {
      if (!connected.value) {
        return "Please connect to extension";
      }

      return (
        <>
          <button
            class={"button is-small " + meta.value.classes}
            onClick={requestTransfer}
          >
            Transfer
          </button>
          <p class="my-3">{meta.value.text}</p>
        </>
      );
    };
  }
}) as any;
