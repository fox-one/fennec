import { computed, defineComponent, ref } from "vue";
import ConnectExt from "../components/ConnectExt";
import GetAccount from "../components/GetAccount";

export default defineComponent(() => {
  const ext = (window as any).__MIXIN__?.mixin_ext;

  let ctx = ref<any>(null);
  const setCtx = (v: any) => (ctx.value = v);

  const connected = computed(() => Boolean(ctx.value));

  return () => (
    <section class="section">
      <div class="container">
        <div class="title is-4">Mixin Client Bot</div>
        <div class="mt-5">
          <ConnectExt ctx={ctx} ext={ext} connected={connected.value} onUpdateCtx={setCtx} />
          <div class="actions mt-5">
            <div class="label">Account Actions</div>
            <GetAccount ctx={ctx} connected={connected.value} />
          </div>
        </div>
      </div>
    </section>
  );
});
