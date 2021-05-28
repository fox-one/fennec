import { InjectedData } from "@foxone/fennec-base/src/inject/types";
import {
  defineComponent,
  PropType,
  toRefs,
  ref,
  computed,
  reactive
} from "vue";
import axios from "axios";

export function getMixinProfile(token: string) {
  return axios.get("https://mixin-api.zeromesh.net/me", {
    headers: { Authorization: `Bearer ${token}` }
  });
}

export default defineComponent({
  name: "SignToken",

  props: {
    connected: Boolean,
    ctx: {
      type: Object as PropType<InjectedData | null>
    }
  },

  setup(props) {
    const { connected, ctx } = toRefs(props);
    const loading = ref(false);
    const token = ref("");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const profile = ref<any>({});

    const getToken = async () => {
      loading.value = true;
      const respToken = await ctx?.value?.wallet.signToken({
        payload: { from: "demo" }
      });

      token.value = respToken || "";

      if (respToken) {
        const respProfile = await getMixinProfile(respToken);

        profile.value = respProfile?.data?.data ?? "";
      }

      loading.value = false;
    };

    const meta = computed(() => {
      return reactive({
        classes: `${loading.value} ? "is-loading" : ""`
      });
    });

    return () => {
      if (!connected.value) {
        return "Please connect to extension to get token";
      }

      return (
        <>
          <button
            class={`button is-small ${meta.value.classes}`}
            onClick={getToken}
          >
            Get Token
          </button>
          <p class="my-3">{token.value}</p>
          <p classmy-3>{JSON.stringify(profile.value)}</p>
        </>
      );
    };
  }
});
