import type {
  InjectedAccount,
  InjectedData
} from "@foxone/mixin-extension-base/src/inject/types";
import { computed, defineComponent, ref, toRefs, PropType } from "vue";

export default defineComponent({
  name: "GetAccount",

  props: {
    connected: Boolean,
    ctx: {
      type: Object as PropType<InjectedData>
    }
  },

  setup(props) {
    const { ctx, connected } = toRefs(props);
    const loading = ref(false);
    const accounts = ref<InjectedAccount[]>([]);

    const getAccount = async () => {
      loading.value = true;
      const res = await ctx?.value?.accounts?.get();
      if (res) {
        accounts.value = res;
      }
      loading.value = false;
    };

    const meta = computed(() => {
      return {
        classes: `${loading.value ? "is-loading" : ""}`,
        text: accounts.value
          ? JSON.stringify(accounts.value)
          : "No Accounts Data"
      };
    });

    return () => {
      if (!connected.value) {
        return "Please connect to extension to get accounts";
      }

      return (
        <>
          <button
            class={"button is-small " + meta.value.classes}
            onClick={getAccount}
          >
            GetAccount
          </button>
          <p class="my-3">{meta.value.text}</p>
        </>
      );
    };
  }
}) as any;
