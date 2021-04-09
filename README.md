# Fennec

Fennec is a browser extension wallet for Mixin Network.

<img width="374" alt="图片" src="https://user-images.githubusercontent.com/67439/114180680-7b160580-997b-11eb-9639-91eb0cf79611.png">


## Supported browsers

- [x] Chrome and Chromium based browsers
- [ ] Firefox
- [ ] Safari

## Install

### Install manually

1. download a release from https://github.com/fox-one/fennec/releases/
2. extract the files into a directory
3. Launch Chrome, visit [chrome://extensions/](chrome://extensions/), click "Load Unpacked", browse the location of `/build` directory.

You will see Fennec in the extension list.

### Install from source code

Clone the code

```
$ git clone https://github.com/fox-one/fennec.git
```

Build the project, and it will generate a `/build` directory.

```
$ yarn
$ yarn build
```

Launch Chrome, visit [chrome://extensions/](chrome://extensions/), click "Load Unpacked", browse the location of `/build` directory.

You will see Fennec in the extension list.

### Install from Chrome webstore

Not ready, waiting for reviewing.

## Create a wallet in Fennec

**IMPORTANT**

- **Please keep your keystore file in safe, and set a strong password in Fennec to protect your keystore.**
- **Backup is important: If you lose your keystore file, you lose the money.**
- **Be aware of the cyber attack: If someone gets your keystore file, your money is stolen.**
- in one word, if you lost the control to the keystore, you fucked up.

### Import an existed keystore

1. visit https://developers.mixin.one/dashboard
2. create a new app
3. "Secret -> APP SESSION -> RSA sesson", create a new keystore file and download it
4. open Fennec, import it into Fennec.
5. if you can not select the keystore file, try to tap the "fullscreen" icon to open Fennec in a new tab

### Create via account service providers

Not ready yet.




