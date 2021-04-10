# Fennec

Fennec is a browser extension wallet for Mixin Network.

<img width="374" alt="图片" src="https://user-images.githubusercontent.com/67439/114180680-7b160580-997b-11eb-9639-91eb0cf79611.png">


## Supported browsers

- [x] Chrome and Chromium based browsers
- [ ] Firefox
- [ ] Safari

## 1. Install

### 1.1 Install manually

1. download a release from https://github.com/fox-one/fennec/releases/
2. extract the files into a directory
3. Launch Chrome, visit [chrome://extensions/](chrome://extensions/), click "Load Unpacked", browse the location of this directory then select it. 

You will then see Fennec in the extension list.

### 1.2 Install from source code

Clone the code

```
$ git clone https://github.com/fox-one/fennec.git
```

Build the project, and it will generate a `/build` directory.

```
$ yarn
$ yarn build
```

Launch Chrome, visit [chrome://extensions/](chrome://extensions/), click "Load Unpacked", browse the location of `/build` directory then select it.

You will then see Fennec in the extension list.

### 1.3 Install from Chrome webstore

Not ready, waiting for being reviewed.

## 2. Create a wallet in Fennec

**IMPORTANT**

- **Please keep your keystore file safe, and set a strong password in Fennec to protect your keystore.**
- **Backup is important: If you lose your keystore file, you lose the money.**
- **Be aware of the cyber attack: If someone gets your keystore file, your money is stolen.**
- In one word, if you lost the control to the keystore, you are fucked up.

### 2.1 Import an existed keystore

1. visit https://developers.mixin.one/dashboard
2. create a new app
3. "Secret -> APP SESSION -> RSA session", create a new keystore file and download it
4. open Fennec, import it into Fennec.
5. if you can not select the keystore file, try to tap the "fullscreen" icon to open Fennec in a new tab

### 2.2 Create via account service providers

Not ready yet.

## 3. Use fennec

[4swap](https://4swap.org) supports Fennec. Visit https://app.4swap.org, tap "Connect wallet" button to use Fennec in 4swap.


## 4. Interact with your Mixin dApp

There are two demos in the project. Go through the source code and you will find it out.

- [A vue demo](https://github.com/fox-one/fennec/tree/main/packages/mixin-extension-demo)
- [A vanilla js demo](https://github.com/fox-one/fennec/tree/main/packages/vanilla-javascript-demo)
