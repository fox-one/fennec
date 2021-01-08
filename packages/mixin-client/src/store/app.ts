export const state = () => ({
  dark: false,
  snackbar: {
    show: false,
    message: "",
    color: "info",
  },
});

export const mutations = {
  toast(state, { message, color }) {
    state.snackbar.show = true;
    state.snackbar.message = message;
    state.snackbar.color = color;
  },
  setSnackbar(state, val) {
    state.snackbar.show = val;
  },
};
