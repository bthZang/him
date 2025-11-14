import fs from "fs";
import CryptoJS from "crypto-js";
import "dotenv/config";

const PRIVATE_KEY = process.env.VITE_PRIVATE_KEY;
if (!PRIVATE_KEY) throw new Error("Missing PRIVATE_KEY in .env.local");

const inputFile = "public/messages.json";
const outputFile = "public/messages.enc.json";

const data = fs.readFileSync(inputFile, "utf8");

const ciphertext = CryptoJS.AES.encrypt(data, PRIVATE_KEY).toString();

fs.writeFileSync(outputFile, JSON.stringify({ ciphertext }, null, 2), "utf8");

console.log("Encrypted → public/messages.enc.json");
