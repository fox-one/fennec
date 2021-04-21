import pkg from "../package.json";

export const VERSION = "v" + pkg.version;

export const FSWAP_URL = "https://f1-4swap-mtg.firesbox.com/#/";

export const POLICY_URL = "https://fox-one.github.io/fennec/policy";

export const TERMS_URL = "https://fox-one.github.io/fennec/terms";

export const DOCS_URL = {
  INSTRUCTIONS:
    "https://github.com/fox-one/fennec/blob/main/docs/import_from_existing_keystore/index.md",
  SWAP_TUTORIAL:
    "https://github.com/fox-one/fennec/blob/main/docs/tutorial_on_swapping/index.md",
  MANDATED_ACCOUNT_NOTICE:
    "https://github.com/fox-one/fennec/blob/main/docs/important_notices_about_mandated_accounts/index.md"
};

export const EVENTS = {
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  APPLICATION_ERROR: "APPLICATION_ERROR"
};

export const BTC_ASSET_ID = "c6d0c728-2624-429b-8e0d-d9d19b6592fa";

export const ETHEREUM_ASSET_ID = "43d61dcd-e413-450d-80b8-101d5e903357";

export const EOS_ASSET_ID = "6cfe566e-4aad-470b-8c9a-2fd35b49c68d";

export const TRON_ASSET_ID = "25dabac5-056a-48ff-b9f9-f67395dc407c";
