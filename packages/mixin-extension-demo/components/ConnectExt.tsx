import { computed, defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "ConnectExt",

  props: {
    ext: Object,
    ctx: Object,
    connected: Boolean,
    onUpdateCtx: Function
  },

  setup(props, { emit }) {
    const { ext, connected } = toRefs(props);
    const loading = ref(false);

    const toggleConnect = () => {
      connected.value ? disconnect() : connect();
    };

    const connect = async () => {
      loading.value = true;
      const ctx = await ext?.value?.enable();
      loading.value = false;
      emit("update-ctx", ctx);
    };

    const disconnect = async () => {
      emit("update-ctx", null);
    };

    const meta = computed(() => {
      return reactive({
        classes: `button ${connected.value ? "is-warning" : "is-primary"} ${loading.value ? "is-loading" : ""}`,
        text: connected.value ? "Disconnect" : "Connect"
      });
    });

    return () => (
      <button class={meta.value.classes} onClick={toggleConnect}>
        {meta.value.text}
      </button>
    );
  }
});
