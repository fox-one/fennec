import { Asset, Snapshot, Transaction } from "@foxone/mixin-api/types";
import endpoints from "../endpoints";
import { GlobalActions, GlobalGetters } from "../store/types";

export function getSnapshotMeta(vm: Vue, snapshot: Snapshot) {
  const formatTime = vm.$utils.time.format;
  const formatNumber = vm.$utils.number.format;
  const toFiat = vm.$utils.currency.toFiat;
  const getValueColor = vm.$utils.color.getValueColor;
  const getAssetById = vm.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
  const getChainAssetLogo = vm.$utils.asset.getChainAssetLogo;

  const snapshotTypeMetas = vm.$utils.enums.snapshotTypeMetas(vm);
  const source = snapshotTypeMetas[snapshot.type];

  const asset: Asset = getAssetById(snapshot.asset_id);
  const chainLogo = getChainAssetLogo(vm, asset?.chain_id ?? "");
  const symbol = asset?.symbol ?? "";
  const price = asset?.price_usd ?? 0;

  const amountUSD = +snapshot.amount * +price;
  const amountFiat = toFiat(vm, { n: Math.abs(amountUSD) });
  const amountSymbol = +snapshot.amount > 0 ? "+" : "-";
  const amountText = formatNumber({ n: Math.abs(+snapshot.amount), dp: 8 });
  const amountColor = getValueColor(vm, +snapshot.amount);

  const directionText = +snapshot.amount > 0 ? "From" : "To";
  const createdAtText = formatTime(snapshot.created_at, "YYYY/MM/DD HH:mm:ss");

  return {
    ...snapshot,

    asset,
    amountFiat,
    amountColor,
    amountSymbol,
    amountText,
    chainLogo,
    component: "snapshot",
    createdAtText,
    id: snapshot.snapshot_id,
    directionText,
    receiver: (snapshot as any).receiver,
    symbol,
    text: source.text
  };
}

export type SnapshotMeta = ReturnType<typeof getSnapshotMeta>;

export function getExternalTransactionMeta(vm: Vue, transaction: Transaction) {
  const formatTime = vm.$utils.time.format;
  const formatNumber = vm.$utils.number.format;
  const toFiat = vm.$utils.currency.toFiat;
  const getAssetById = vm.$store.getters[GlobalGetters.GET_ASSET_BY_ID];
  const getValueColor = vm.$utils.color.getValueColor;

  const confirmations = transaction.confirmations;
  const threshold = transaction.threshold;
  const progress = ((confirmations / threshold) * 100).toFixed();
  const asset = getAssetById(transaction.asset_id);
  const symbol = asset?.symbol ?? "";
  const price = asset?.price_usd ?? 0;
  const amountSymbol = +transaction.amount > 0 ? "+" : "-";
  const amountText = formatNumber({ n: Math.abs(+transaction.amount), dp: 8 });
  const amountUSD = +transaction.amount * +price;
  const amountFiat = toFiat(vm, { n: Math.abs(amountUSD) });
  const amountColor = getValueColor(vm, +transaction.amount);
  const createdAtText = formatTime(
    transaction.created_at,
    "YYYY/MM/DD HH:mm:ss"
  );

  return {
    ...transaction,

    asset,
    amountFiat,
    amountSymbol,
    amountText,
    amountColor,
    component: "transaction",
    createdAtText,
    id: transaction.transaction_id,
    progress,
    symbol,
    text: "Confirming"
  };
}

export type ExternalTransactionMeta = ReturnType<
  typeof getExternalTransactionMeta
>;

export async function loadSnapshots(
  current: Snapshot[],
  opts: { asset?: string; onEnd?: (...args: any) => void },
  dispatch
) {
  const currentMap = current.reduce(
    (m, x) => ({ ...m, [x.snapshot_id]: x }),
    {}
  );

  const offset = current[current.length - 1]?.created_at ?? "";
  const asset = opts.asset ?? "";
  const resp = await endpoints.getSnapshots({ asset, limit: 10, offset });
  const snapshots = resp.filter((x) => !currentMap[x.snapshot_id]);
  const users = Array.from(new Set(snapshots.map((x) => x.opponent_id)));

  users.forEach((x) => {
    dispatch(GlobalActions.LOAD_USER, { id: x }, { root: true });
  });

  if (
    (resp.length < 10 || snapshots.length === 0) &&
    opts.onEnd &&
    typeof opts.onEnd === "function"
  ) {
    opts.onEnd();
  }

  return [...current, ...snapshots];
}

export async function loadExternalTransactions(opts: {
  destination: string;
  tag: string;
}) {
  const destination = opts.destination;
  const tag = opts.tag;

  if (!destination || !tag) {
    return [];
  }

  return await endpoints.getExternalTransactions({
    destination,
    limit: 100,
    offset: "",
    tag
  });
}
