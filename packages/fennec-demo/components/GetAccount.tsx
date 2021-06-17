import { computed, defineComponent, ref, toRefs, inject, reactive } from "vue";

import type { InjectedAccount } from "@foxone/fennec-base/src/inject/types";
import type Fennec from "@foxone/fennec-dapp/src";
import type { User } from "@foxone/mixin-api/types";

export default defineComponent({
  name: "GetAccount",

  props: {
    connected: Boolean
  },

  setup(props) {
    const { connected } = toRefs(props);
    const fennec = inject<Fennec>("fennec");
    const loading = ref(false);
    const accounts = ref<InjectedAccount[]>([]);
    const me = ref<User | null>(null);

    const getAccount = async () => {
      loading.value = true;
      const res = await fennec?.ctx?.accounts.get();
      const current = await fennec?.ctx?.accounts.current();

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
        accounts: accounts.value
          ? JSON.stringify(accounts.value)
          : "No Accounts Data",
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
            onClick={getAccount}
          >
            GetAccount
          </button>
          <p class="my-3">{meta.value.accounts}</p>
          <p class="my-3">{JSON.stringify(me.value)}</p>
        </>
      );
    };
  }
}) as any;
