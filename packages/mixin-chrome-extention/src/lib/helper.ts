import extension from "extensionizer";

export function isEmpty(obj) {
  return Object.keys(obj).length === 0;
}

export function checkError() {
  const { lastError } = extension.runtime;
  if (!lastError) {
    return undefined;
  }

  if (lastError.stack && lastError.message) {
    return lastError;
  }

  return new Error(lastError.message);
}
