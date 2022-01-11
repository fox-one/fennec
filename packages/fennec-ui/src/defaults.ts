import pkg from "../package.json";

export const VERSION = "v" + pkg.version;

export const MIXIN_DOWNLOAD_URL = "https://mixin.one/messenger";

export const FSWAP_URL = "https://app.4swap.org/#/swap";

export const POLICY_URL = "https://fox-one.github.io/fennec/policy";

export const TERMS_URL = "https://fox-one.github.io/fennec/terms";

export const DOCS_URL = {
  INSTRUCTIONS:
    "https://github.com/fox-one/fennec/blob/main/docs/import_from_existing_keystore/index.md",
  MANDATED_ACCOUNT_NOTICE:
    "https://github.com/fox-one/fennec/blob/main/docs/important_notices_about_mandated_accounts/index.md",
  SWAP_TUTORIAL:
    "https://github.com/fox-one/fennec/blob/main/docs/tutorial_on_swapping/index.md",
  GITHUB: "https://github.com/fox-one/fennec",
  TWITTER: "https://twitter.com/pando_im"
};

export const EVENTS = {
  APPLICATION_ERROR: "APPLICATION_ERROR",
  CONFIRM_PASSWORD: "CONFIRM_PASSWORD",
  SET_NAV_TITLE: "SET_NAV_TITLE",
  SET_NAV_TAIL: "SET_NAV_TAIL",
  CHECK_PRIVACY_TERMS: "CHECK_PRIVACY_TERMS",
  REFRESH_ACTIVITY: "REFRESH_ACTIVITY"
};

export const BTC_ASSET_ID = "c6d0c728-2624-429b-8e0d-d9d19b6592fa";

export const ETHEREUM_ASSET_ID = "43d61dcd-e413-450d-80b8-101d5e903357";

export const EOS_ASSET_ID = "6cfe566e-4aad-470b-8c9a-2fd35b49c68d";

export const TRON_ASSET_ID = "25dabac5-056a-48ff-b9f9-f67395dc407c";
