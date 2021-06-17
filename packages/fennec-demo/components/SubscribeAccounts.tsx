import { defineComponent, toRefs, ref, inject, computed, reactive } from "vue";

import type { AccountsSubInfo } from "@foxone/fennec-base/src/inject/types";
import type Fennec from "@foxone/fennec-dapp/src";

export default defineComponent({
  name: "SubscribAccounts",

  props: { connected: Boolean },

  setup(props) {
    const { connected } = toRefs(props);
    const accountsInfo = ref<AccountsSubInfo | null>(null);
    const loading = ref(false);
    const fennec = inject<Fennec>("fennec");

    const subscribe = () => {
      fennec?.ctx?.accounts.subscribe((data) => {
        console.log("data change", data);
        accountsInfo.value = data;
      });
    };

    const meta = computed(() => {
      return reactive({ classes: `${loading.value ? "is-loading" : ""}` });
    });

    return () => {
      if (!connected.value) {
        return "Please connect to extension to subscribe accounts";
      }

      return (
        <>
          <button
            class={`button is-small ${meta.value.classes}`}
            onClick={subscribe}
          >
            Subscribe
          </button>
          <p class="my-3">{accountsInfo?.value?.accounts.join(",")}</p>
          <p class="my-3">{accountsInfo?.value?.current}</p>
        </>
      );
    };
  }
});
