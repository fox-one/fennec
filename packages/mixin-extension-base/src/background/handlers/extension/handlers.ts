export default function createHandlers(state) {
  return {
    accountsSubscribe(payload: { origin: string }): boolean {
      return false;
    },
    approveAuthorize() {
      return;
    }
  };
}

export type ExtensionActionHandlers = ReturnType<typeof createHandlers>;
