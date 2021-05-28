import { InjectedData } from "@foxone/fennec-base/src/inject/types";
import { Asset } from "@foxone/mixin-api/types";
import {
  defineComponent,
  PropType,
  toRefs,
  ref,
  computed,
  reactive
} from "vue";

const btc = "c6d0c728-2624-429b-8e0d-d9d19b6592fa";

export default defineComponent({
  name: "GetAsset",

  props: {
    connected: Boolean,
    ctx: {
      type: Object as PropType<InjectedData | null>
    }
  },

  setup(props) {
    const { connected, ctx } = toRefs(props);
    const loading = ref(false);
    const asset = ref<Asset | null>(null);

    const getAsset = async () => {
      loading.value = true;
      const res = await ctx?.value?.wallet.getAsset(btc);

      if (res) {
        asset.value = res;
      }

      loading.value = false;
    };

    const meta = computed(() => {
      return reactive({
        classes: `${loading.value ? "is-loading" : ""}`
      });
    });

    return () => {
      if (!connected.value) {
        return "Please connect to extension to get accounts";
      }

      return (
        <>
          <button
            class={`button is-small ${meta.value.classes}`}
            onClick={getAsset}
          >
            Get BTC
          </button>
          <p class="my-3">{JSON.stringify(asset.value)}</p>
        </>
      );
    };
  }
}) as any;
