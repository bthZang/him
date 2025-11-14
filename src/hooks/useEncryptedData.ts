import { useEffect, useState } from "react";
import CryptoJS from "crypto-js";

export function useEncryptedData() {
  const [data, setData] = useState<any[] | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        console.log("check PRIVATE KEY");
console.log("ALL ENV:", import.meta.env);

        const res = await fetch("/messages.enc.json");
        console.log("FETCH STATUS:", res);
        
        const json = await res.json();
        console.log("RAW JSON:", json);
        
        const { ciphertext } = json;
        console.log("FETCH body:", ciphertext);

        const key = import.meta.env.VITE_PRIVATE_KEY; // lấy từ .env
        console.log("PRIVATE KEY:", key);

        if (!key) throw new Error("Missing private key");
        console.log("PRIVATE KEY:", key);

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
