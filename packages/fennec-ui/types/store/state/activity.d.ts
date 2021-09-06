declare namespace State {
  export type Activity = {
    globalSnapshots: Snapshot[];
    snapshots: Snapshot[];
    transactions: Transaction[];
  };
}
