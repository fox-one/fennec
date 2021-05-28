import { defineComponent, reactive, provide } from "vue";
import ConnectExt from "../components/ConnectExt";
import GetAccount from "../components/GetAccount";
import GetAsset from "../components/GetAsset";
import Transfer from "../components/Transfer";
import SignToken from "../components/SignToken";
import Multisigs from "../components/Multisigs";
import Fennec from "@foxone/fennec-dapp/src";

function useFennec(fennec: Fennec, name: string) {
  const state = reactive({
    connected: false,
    available: fennec.available,
    connecting: false
  });

  const toggle = async () => {
    if (fennec.connected) {
      fennec.disconnect();
    } else {
      state.connecting = true;
      try {
        await fennec.connect(name);
      } catch (error) {
        state.connecting = false;
        alert(error);
      }
      state.connecting = false;
    }

    state.connected = fennec.connected;
  };

  return {
    toggle,
    state
  };
}

export default defineComponent(() => {
  const fennec = new Fennec();
  const { state, toggle } = useFennec(fennec, "Fennec Demo");

  provide("fennec", fennec);

  return () => (
    <section class="section">
      <div class="container">
        <div class="title is-4">Mixin Client Bot Demo</div>
        <div class="mt-5">
          <div>
            <div class="label">Connect wallet</div>
            <ConnectExt connected={state.connected} onToggle={() => toggle()} />
          </div>
          <div class="actions mt-5">
            <div class="label">Get Account</div>
            <GetAccount connected={state.connected} />
          </div>
          <div class="actions mt-5">
            <div class="label">Get Asset</div>
            <GetAsset connected={state.connected} />
          </div>
          <div class="action mt-5">
            <div class="label">Transfer</div>
            <Transfer connected={state.connected} />
          </div>
          <div class="action mt-5">
            <div class="label">Multisigs</div>
            <Multisigs connected={state.connected} />
          </div>
          <div class="action mt-5">
            <div class="label">Sign Token</div>
            <SignToken connected={state.connected} />
          </div>
        </div>
      </div>
    </section>
  );
});
