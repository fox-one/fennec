import { computed, defineComponent, ref, toRefs } from "vue";

export default defineComponent({
  name: "GetAccount",

  props: {
    connected: Boolean,
    ctx: Object
  },

  setup(props) {
    const { ctx, connected } = toRefs(props);
    const loading = ref(false);
    const accounts = ref(null);

    const getAccount = async () => {
      loading.value = true;
      const res = await ctx?.value?.accounts?.get();
      accounts.value = res;
      loading.value = false;
    };

    const meta = computed(() => {
      return {
        classes: `${loading ? "is-loading" : ""}`,
        text: accounts.value ? JSON.stringify(accounts.value) : "No Accounts Data"
      };
    });

    return () => {
      if (!connected.value) {
        return "Please connect to extension to get accounts";
      }

      return (
        <>
          <p class="my-3">{meta.value.text}</p>
          <button class={"button is-small" + meta.value.classes} onClick={getAccount}>
            GetAccount
          </button>
        </>
      );
    };
  }
}) as any;
