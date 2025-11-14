import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export function useEncryptedContent(feelingId: number, type: string) {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {

      try {
        if (!feelingId || !type) return;

        console.log("Loading encrypted:", feelingId, type);

        const path = `/contents/feelings/${feelingId}.${type}.enc.json`;

        const res = await fetch(path);
        if (!res.ok) throw new Error(`File not found: ${path}`);

        const json = await res.json();
        const { ciphertext } = json;

        const key = import.meta.env.VITE_PRIVATE_KEY;
        if (!key) throw new Error("Missing private key");

        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);

        if (!plaintext) throw new Error("Decryption failed");

        setData(JSON.parse(plaintext));
      } catch (e: any) {
        console.error(e);
        setError(e.message);
      }
    }

    load();
  }, [feelingId, type]);

  return { data, error };
}
