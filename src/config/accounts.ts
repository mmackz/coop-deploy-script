import { config } from "@dotenvx/dotenvx";
config();

import type { Address, Hex, PrivateKeyAccount } from "viem";
import { privateKeyToAccount } from "viem/accounts";

export type Account = {
  account: Address;
  key: Hex;
  privateKey: PrivateKeyAccount;
};

export type Accounts = [Account];

const key = process.env.ACCOUNT_1_KEY as Hex;
const privateKey = privateKeyToAccount(key);

export const accounts: Accounts = [
  {
    account: privateKey.address as Address,
    key,
    privateKey,
  }
] as Accounts;
