import { computed, defineComponent, reactive, ref, toRefs } from "vue";

export default defineComponent({
  name: "ConnectExt",

  props: {
    connected: Boolean
  },

  emits: ["toggle"],

  setup(props, { emit }) {
    const { connected } = toRefs(props);
    const loading = ref(false);

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
        <button class={meta.value.classes} onClick={() => emit("toggle")}>
          {meta.value.text}
        </button>
      </>
    );
  }
}) as any;
