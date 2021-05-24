import type {
  InjectedAccount,
  InjectedData
} from "@foxone/mixin-extension-base/src/inject/types";
import Fennec from "@foxone/mixin-extension-dapp";
import { User } from "@foxone/mixin-sdk/src/types";
import {
  computed,
  defineComponent,
  ref,
  toRefs,
  PropType,
  reactive
} from "vue";

export default defineComponent({
  name: "GetAccount",

  props: {
    connected: Boolean,
    fennec: Fennec
  },

  setup(props) {
    const { connected } = toRefs(props);
    const loading = ref(false);
    const accounts = ref<InjectedAccount[]>([]);
    const me = ref<User | null>(null);

    const getAccount = async () => {
      loading.value = true;
      const res = await props.fennec?.ctx?.accounts.get();
      const current = await props.fennec?.ctx?.accounts.current();
      if (res) {
        accounts.value = res;
      }
      if (current) {
        me.value = current;
      }
      loading.value = false;
    };

    const meta = computed(() => {
      return reactive({
        classes: `${loading.value ? "is-loading" : ""}`,
        accounts: accounts.value
          ? JSON.stringify(accounts.value)
          : "No Accounts Data",
        me: me.value
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
            onClick={getAccount}
          >
            GetAccount
          </button>
          <p class="my-3">{meta.value.accounts}</p>
          <p class="my-3">{meta.value.me}</p>
        </>
      );
    };
  }
}) as any;
