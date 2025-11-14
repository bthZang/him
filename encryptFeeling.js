import fs from "fs";
import path from "path";
import CryptoJS from "crypto-js";
import "dotenv/config";

const PRIVATE_KEY = process.env.VITE_PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY in .env.local");

const ROOT = "public/contents/feelings";

const TYPES = [
  { id: "video", label: "watch" },
  { id: "listen", label: "listen" },
  { id: "whatever", label: "whatever" },
];

function encryptFile(inputPath, outputPath) {
  const raw = fs.readFileSync(inputPath, "utf8");
  const ciphertext = CryptoJS.AES.encrypt(raw, PRIVATE_KEY).toString();

  fs.writeFileSync(outputPath, JSON.stringify({ ciphertext }, null, 2), "utf8");

  console.log("Encrypted:", outputPath);
}

for (let id = 1; id <= 7; id++) {
  TYPES.forEach((t) => {
    const input = path.join(ROOT, `${id}.${t.label}.json`);
    const output = path.join(ROOT, `${id}.${t.label}.enc.json`);

    if (!fs.existsSync(input)) {
      console.warn("Missing file:", input);
      return;
    }

    encryptFile(input, output);
  });
}

console.log("Done encrypting all feelings + types.");
