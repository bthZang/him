import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export function useDuyEncryptedData() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        console.log("check PRIVATE KEY");

        const res = await fetch("/duy.messages.enc.json");
        
        const json = await res.json();
        
        const { ciphertext } = json;

        const key = import.meta.env.VITE_PRIVATE_KEY;

        if (!key) throw new Error("Missing private key");

        const bytes = CryptoJS.AES.decrypt(ciphertext, key);
        const plaintext = bytes.toString(CryptoJS.enc.Utf8);
        if (!plaintext) throw new Error("Decryption failed");

        setData(JSON.parse(plaintext));
      } catch (e: any) {
        setError(e.message);
      }
    }

    load();
  }, []);

  return { data, error };
}
