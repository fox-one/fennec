# Fennec

Fennec is an opensource browser extension wallet for Mixin Network.

![](https://lh3.googleusercontent.com/6yvEm05DlmLsipLv_87p7lxk_INfedElWcv2L5YkB6k-pGDKBCax7EINAdveOjtH7zKq3aV6ZvRN0BjXv_l4mC5l=w640-h400-e365-rj-sc0x00ffffff)

## 0. Supported browsers

- [x] Chrome and Chromium based browsers
- [x] Firefox
- [ ] Safari

## 1. Install

### 1.1 Install from Chrome webstore or Firefox add-ons 🛒

- [Firefox Add-ons](https://addons.mozilla.org/en-US/firefox/addon/fox_fennec/)
- [Chrome Store](https://chrome.google.com/webstore/detail/fennec/eincngenkhohbbfpkohipekcmnkfamjp)

### 1.2 Install manually 📦

1. download a release file from https://github.com/fox-one/fennec/releases/
2. Chrome:

- Extract the files into a directory
- Launch Chrome, visit [chrome://extensions/](chrome://extensions/), click "Load Unpacked", browse the location of this directory then select it.

3. Firefox:

- Launch Firefox, visit [about:debugging#/runtime/this-firefox](about:debugging#/runtime/this-firefox), click "Load Temporary Add-on...", browse the location of file then select it.

You will then see Fennec in the extension list.

### 1.3 Install from source code 🔧

Clone the code

```
$ git clone https://github.com/fox-one/fennec.git
```

Build the project, and it will generate a directory at `./packages/mixin-extension/build`.

```
$ yarn
$ yarn build
```

If you are using Chrome, follow the 2nd step in "Install manually" section. If you are using Firefox, create a zip file and follow the 3rd step in that section.

## 2. Create a wallet in Fennec

**IMPORTANT**

- **Please keep your keystore file safe, and set a strong password in Fennec to protect your keystore.**
- **Backup is important: If you lose your keystore file, you lose the money.**
- **Be aware of the cyber attack: If someone gets your keystore file, your money is stolen.**
- In one word, if you lost the control to the keystore, you are fucked up.

### 2.1 Import an existed keystore 🗝

1. visit https://developers.mixin.one/dashboard
2. create a new app
3. "Secret -> APP SESSION -> RSA session or Ed25519 session", create a new keystore file and download it
4. open Fennec, import it into Fennec.
5. if you can not select the keystore file, try to tap the "fullscreen" icon to open Fennec in a new tab

### 2.2 Create via account service providers 🔑

1. Official provider
   - Open Fennec, create account with default provider
2. Private provider with fennec-asp
   - Build [fennec-asp](https://github.com/fox-one/fennec-asp) on your machine
   - Run server: `./builds/fennec server --config xxx --port 9000`
   - Get provider address by append `/users` to server. e.g. `http://192.168.0.1:9000/users`
   - Add the address to Fennec - "Create Account - Custom Provider - Add Provider"
   - Create Account - please make sure the server keep running while creating account

## 3. Use fennec

- [4swap](https://4swap.org): Visit https://app.4swap.org, tap "Connect wallet" button to use Fennec in 4swap.
- [Mixcoin](https://mixcoin.one)(Chinese): tap "连接钱包" link to use Fennec.

## 4. Interact with your Mixin dApp

There are two demos in the project. Go through the source code and you will find it out.

- [A vue demo](https://fox-one.github.io/fennec), and its [source code](https://github.com/fox-one/fennec/tree/main/packages/mixin-extension-demo)
- [A vanilla js demo](https://fox-one.github.io/fennec/javascript), and its [source code](https://github.com/fox-one/fennec/blob/main/packages/mixin-extension-demo/public/javascript.html)
