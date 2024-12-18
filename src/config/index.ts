import {
  createPublicClient,
  createWalletClient,
  http,
  publicActions,
  walletActions,
} from "viem";
import { createConfig } from "@wagmi/core";
import { base } from "viem/chains";
import { accounts } from "./accounts.js";
import { BoostCore, BoostRegistry } from "@boostxyz/sdk";

const account = accounts[0].privateKey;

export const baseClient = createPublicClient({
  transport: http("https://base.meowrpc.com"),
  chain: base,
})
  .extend(publicActions)
  .extend(walletActions);

export const walletClient = createWalletClient({
  account,
  chain: base,
  transport: http("https://base.meowrpc.com"),
});

export const config = createConfig({
  chains: [base],
  client: () => baseClient,
});

export const core = new BoostCore({ config, account });
export const registry = new BoostRegistry({ config, account });
