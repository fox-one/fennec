import { SnapshotType } from "@foxone/mixin-api/types";

type Meta<T extends string> = Record<T, { icon?: string; text: string }>;

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function snapshotTypeMetas(_vm: Vue): Meta<SnapshotType> {
  return {
    [SnapshotType.DEPOSIT]: {
      text: "Deposit"
    },
    [SnapshotType.TRANSFER]: {
      text: "Transfer"
    },
    [SnapshotType.WITHDRAWAL_FAILED]: {
      text: "Rebate"
    },
    [SnapshotType.WITHDRAWAL_FEE_CHARGED]: {
      text: "Fee"
    },
    [SnapshotType.WITHDRAWAL]: {
      text: "Withdrawal"
    },
    [SnapshotType.RAW]: {
      text: "Raw"
    }
  };
}
