import { SignatureType } from "@boostxyz/sdk";
import { core } from "../config";
import { Address, parseEther } from "viem";
import { mintEventSelector } from "../actions/sound-mint";

/**
 * Creates a Sound.xyz mint incentive configuration for cooperative boosts
 * @param collection The Sound.xyz collection contract address
 * @param asset The token address to be used as reward (e.g., ETH, USDC)
 * @param limit The total amount of tokens (in wei) to be distributed across all claims
 * @param maxReward The maximum amount of tokens (in wei) that can be claimed per wallet
 * @param reward Optional - The ETH value of tokens (in wei) to reward per NFT minted. 
 *               If not provided, defaults to covering 100% of mint cost (0.000777 ETH)
 * @returns A configured ERC20PeggedVariableCriteriaIncentive for the Sound.xyz mint
 */
export async function createSoundMintCoopIncentive(
  collection: Address,
  asset: Address,
  limit: bigint,
  maxReward: bigint,
  reward: bigint = parseEther("0.000777"),
) {
  return core.ERC20PeggedVariableCriteriaIncentive({
    asset,
    peg: "0x0000000000000000000000000000000000000000", // ETH
    reward,
    limit,
    maxReward,
    criteria: {
      criteriaType: SignatureType.EVENT,
      signature: mintEventSelector,
      targetContract: collection,
      fieldIndex: 2, // quantity
    },
  });
}
