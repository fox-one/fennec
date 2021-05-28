import { computed, defineComponent } from "vue";
import ConnectExt from "../components/ConnectExt";
import GetAccount from "../components/GetAccount";
// import GetAsset from "../components/GetAsset";
// import Transfer from "../components/Transfer";
// import SignToken from "../components/SignToken";
// import Multisigs from "../components/Multisigs";
import Fennec from "@foxone/fennec-dapp";

export default defineComponent(() => {
  const fennec = new Fennec();

  const connected = computed(() => Boolean(fennec.connected));

  return () => (
    <section class="section">
      <div class="container">
        <div class="title is-4">Mixin Client Bot Demo</div>
        <div class="mt-5">
          <div>
            <div class="label">Connect wallet</div>
            <ConnectExt fennec={fennec} connected={connected.value} />
          </div>
          <div class="actions mt-5">
            <div class="label">Get Account</div>
            <GetAccount fennec={fennec} connected={connected.value} />
          </div>
          {/* <div class="actions mt-5">
            <div class="label">Get Asset</div>
            <GetAsset fennec={fennec} connected={connected.value} />
          </div>
          <div class="action mt-5">
            <div class="label">Transfer</div>
            <Transfer fennec={fennec} connected={connected.value} />
          </div>
          <div class="action mt-5">
            <div class="label">Multisigs</div>
            <Multisigs fennec={fennec} connected={connected.value} />
          </div>
          <div class="action mt-5">
            <div class="label">Sign Token</div>
            <SignToken fennec={fennec} connected={connected.value} />
          </div> */}
        </div>
      </div>
    </section>
  );
});
