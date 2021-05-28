import { SnapshotType } from "@foxone/mixin-api/types";

type Meta<T extends string> = Record<T, { icon: string; text: string }>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function snapshotTypeMetas(_vm: Vue): Meta<SnapshotType> {
  return {
    [SnapshotType.DEPOSIT]: {
      icon: require("../assets/images/deposit.svg"),
      text: "Deposit"
    },
    [SnapshotType.TRANSFER]: {
      icon: require("../assets/images/transfer.svg"),
      text: "Transfer"
    },
    [SnapshotType.WITHDRAWAL_FAILED]: {
      icon: require("../assets/images/rebate.svg"),
      text: "Rebate"
    },
    [SnapshotType.WITHDRAWAL_FEE_CHARGED]: {
      icon: require("../assets/images/mining.svg"),
      text: "Fee"
    },
    [SnapshotType.WITHDRAWAL]: {
      icon: require("../assets/images/withdraw.svg"),
      text: "Withdrawal"
    },
    [SnapshotType.RAW]: {
      icon: require("../assets/images/global.svg"),
      text: "Raw"
    }
  };
}
