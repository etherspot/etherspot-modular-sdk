import fs from 'fs/promises';
import path from "path";
import prettier from "prettier";
import crypto from 'crypto';

const INIT_CONFIG = {
  rpcProviderUrl: "https://testnet-rpc.etherspot.io/v1/11155111",
  signingKey: generateRandomPrivateKey(),
  chainId: 11155111,
  paymaster: {
    rpcUrl: "",
    context: {},
  },
};

function generateRandomPrivateKey() {
  // Generate a random 32-byte buffer
  const privateKey = crypto.randomBytes(32);
  return privateKey.toString('hex');
}

const CONFIG_PATH = path.resolve(__dirname, "../config.json");

async function main() {
  return fs.writeFile(
    CONFIG_PATH,
    prettier.format(JSON.stringify(INIT_CONFIG, null, 2), { parser: "json" })
  );
}

main()
  .then(() => console.log(`Config written to ${CONFIG_PATH}`))
  .catch((error) => {
    console.error(error);
    process.exit(1);
  });
