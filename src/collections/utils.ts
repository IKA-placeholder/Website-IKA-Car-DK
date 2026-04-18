import { compressToUTF16, decompressFromUTF16 } from "lz-string";

export const compressedStorage = {
  getItem(key: string) {
    const compressed = localStorage.getItem(key);
    return compressed ? decompressFromUTF16(compressed) : null;
  },
  setItem(key: string, value: string) {
    localStorage.setItem(key, compressToUTF16(value));
  },
  removeItem(key: string) {
    localStorage.removeItem(key);
  },
};
