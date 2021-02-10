import { SnapshotSource } from "@foxone/mixin-sdk/types";

export function snapshotSourceMeta(_vm: Vue) {
  return {
    [SnapshotSource.DEPOSIT_CONFIRMED]: {
      text: "Deposit",
      icon: require("../assets/images/deposit.svg")
    },
    [SnapshotSource.TRANSFER_INITIALIZED]: {
      text: "Transfer",
      icon: require("../assets/images/transfer.svg")
    },
    [SnapshotSource.WITHDRAWAL_FAILED]: {
      text: "Rebate",
      icon: require("../assets/images/rebate.svg")
    },
    [SnapshotSource.WITHDRAWAL_FEE_CHARGED]: {
      text: "Fee",
      icon: require("../assets/images/mining.svg")
    },
    [SnapshotSource.WITHDRAWAL_INITIALIZED]: {
      text: "Withdrawal",
      icon: require("../assets/images/withdraw.svg")
    }
  };
}
