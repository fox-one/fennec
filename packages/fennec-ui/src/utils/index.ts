import utils from "@foxone/utils";
import * as app from "./app";
import * as helper from "./helper";
import * as currency from "./currency";
import * as color from "./color";
import * as enums from "./enums";
import * as account from "./account";
import * as asset from "./asset";

export default {
  account,
  asset,
  app,
  color,
  currency,
  enums,
  helper,
  number: utils.number,
  time: utils.time
};
