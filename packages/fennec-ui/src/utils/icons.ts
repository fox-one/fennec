import * as FIcons from "@foxone/icons";
import { mdiHelpCircle } from "@mdi/js";
import { FIconChevronDown } from "@foxone/icons";

const ficons = [
  "FIconAdd4PBold",
  "FIconAdd",
  "FIconImport4PBold",
  "FIconSetting4P",
  "FIconMoreVertical",
  "FIconFile",
  "FIconArrowDown",
  "FIconChevronRight",
  "FIconChevronLeft",
  "FIconConvertDirection",
  "FIconSearch",
  "FIconCopy",
  "FIconUpRight",
  "FIconChevronDown",
  "FIconEdit4P",
  "FIconEdit",
  "FIconLock",
  "FIconMax",
  "FIconImport",
  "FIconSetting",
  "FIconHelp3PFill",
  "FIconRestore",
  "FIconChevronDown4P",
  "FIconCheckBoxOn3PFill",
  "FIconCheckBoxOff3P",
  "FIconMoreVertical",
  "FIconCheck4P",
  "FIconSetting4PFill",
  "FIconCheck",
  "FIconArrowDownBold",
  "FIconConvertDirectionBold",
  "FIconWarningFill",
  "FIconRefresh4PBold",
  "FIconInfo4P",
  "FIconTrash4P"
].reduce((m, k) => ({ ...m, [k]: { component: FIcons[k] } }), {});

const icons = [
  "IconEdit",
  "IconArrowUp",
  "IconCollapse",
  "IconRemove",
  "IconTwitter",
  "IconLink",
  "IconLinkTo",
  "IconAddBold",
  "IconGithub",
  "IconInfo"
].reduce((m, k) => ({ ...m, [k]: { component: k } }), {});

export default {
  ...ficons,
  ...icons,
  dropdown: { component: FIconChevronDown },
  mdiHelpCircle
};
