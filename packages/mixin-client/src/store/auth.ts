import { MutationTree, GetterTree, ActionTree } from "vuex";

const state = () => ({
  token: "",
});

export type AuthState = ReturnType<typeof state>;

export const getters: GetterTree<AuthState, any> = {
  isLogged(state) {
    return Boolean(state.token);
  },
  getToken(state) {
    return state.token;
  },
};

export const mutations: MutationTree<AuthState> = {
  SET_TOKEN(state, data: { token: string }) {
    state.token = data.token;
  },
};

export const actions: ActionTree<AuthState, any> = {
  logout({ commit }) {
    commit("SET_TOKEN", { token: "" });
  },
};
