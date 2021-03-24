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
    const { connected } = toRefs(props);
    const loading = ref(false);

    const toggleConnect = () => {
      connected.value ? disconnect() : connect();
    };

    const connect = async () => {
      loading.value = true;
      try {
        const ext = (window as any).__MIXIN__?.mixin_ext;
        const ctx = await ext?.enable("Mixin Client Demo");
        emit("update-ctx", ctx);
      } catch (error) {
        alert(error.message);
      }
      loading.value = false;
    };

    const disconnect = async () => {
      emit("update-ctx", null);
    };

    const meta = computed(() => {
      return reactive({
        classes: `button ${
          connected.value ? "is-warning is-small" : "is-primary"
        } ${loading.value ? "is-loading" : ""}`,
        text: connected.value ? "Disconnect" : "Connect"
      });
    });

    return () => (
      <>
        <button class={meta.value.classes} onClick={toggleConnect}>
          {meta.value.text}
        </button>
      </>
    );
  }
}) as any;
