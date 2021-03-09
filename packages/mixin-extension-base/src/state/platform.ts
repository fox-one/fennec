import {
  focusWindow,
  getLastFocusedWindow,
  openWindow,
  updateWindowPosition,
  getAllWindows,
  closeWindow
} from "../utils/platform";

const NOTIFICATION_WIDTH = 360;
const NOTIFICATION_HEIGHT = 620;

export default class Popup {
  #id = null;

  public async showPopup() {
    const popup = await this.getPopup();
    if (popup) {
      await focusWindow(popup.id);
    } else {
      let left = 0;
      let top = 0;
      try {
        const lastFocused: any = await getLastFocusedWindow();
        top = lastFocused.top;
        left = lastFocused.left + (lastFocused.width - NOTIFICATION_WIDTH);
      } catch (_) {
        const { screenX, screenY, outerWidth } = window;
        top = Math.max(screenY, 0);
        left = Math.max(screenX + (outerWidth - NOTIFICATION_WIDTH), 0);
      }

      const win: any = await openWindow({
        url: "notification.html",
        type: "popup",
        width: NOTIFICATION_WIDTH,
        height: NOTIFICATION_HEIGHT,
        left,
        top
      });

      if (win.left !== left && win.state !== "fullscreen") {
        await updateWindowPosition(win.id, left, top);
      }
      this.#id = win.id;
    }
  }

  public closePopup() {
    closeWindow(this.#id);
    this.#id = null;
  }

  private async getPopup() {
    const windows = await getAllWindows();
    return this.getPopupIn(windows);
  }

  private getPopupIn(windows) {
    if (windows) {
      return windows.find((win) => {
        return win && win.type === "popup" && win.id === this.#id;
      });
    }
    return null;
  }
}
