import { SnapshotType } from "@foxone/mixin-sdk/types";

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function snapshotTypeMetas(_vm: Vue) {
  return {
    [SnapshotType.DEPOSIT]: {
      text: "Deposit",
      icon: require("../assets/images/deposit.svg")
    },
    [SnapshotType.TRANSFER]: {
      text: "Transfer",
      icon: require("../assets/images/transfer.svg")
    },
    [SnapshotType.WITHDRAWAL_FAILED]: {
      text: "Rebate",
      icon: require("../assets/images/rebate.svg")
    },
    [SnapshotType.WITHDRAWAL_FEE_CHARGED]: {
      text: "Fee",
      icon: require("../assets/images/mining.svg")
    },
    [SnapshotType.WITHDRAWAL]: {
      text: "Withdrawal",
      icon: require("../assets/images/withdraw.svg")
    },
    [SnapshotType.RAW]: {
      text: "Raw",
      icon: require("../assets/images/global.svg")
    }
  };
}
