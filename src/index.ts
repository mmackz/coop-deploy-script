import { Command } from "commander";
import { Address, parseEther } from "viem";
import { createSoundMintPayload } from "./actions/sound-mint-tuple";
import { createSoundMintCoopIncentive } from "./incentives/sound-mint-coop";
import { core } from "./config";
import { deployBoost } from "./deploy";

const program = new Command();

program
  .name("boost-playground")
  .description("CLI to deploy Sound.xyz mint boosts")
  .requiredOption("-c, --collection <address>", "Sound.xyz collection address")
  .requiredOption("-a, --asset <address>", "Reward token address")
  .requiredOption(
    "-l, --limit <amount>",
    "Total amount of reward token to distribute"
  )
  .requiredOption(
    "-m, --max-reward <amount>",
    "Maximum amount of reward token per wallet"
  )
  .option(
    "-r, --reward <amount>",
    "Reward per NFT minted (denominated in ETH)",
    "0.000777"
  );

program.parse();

const options = program.opts();

(async () => {
  const budget = core.ManagedBudget(process.env.BUDGET_ADDRESS as Address);

  const actionPayload = createSoundMintPayload(options.collection as Address);
  const incentive = await createSoundMintCoopIncentive(
    options.collection as Address,
    options.asset as Address,
    parseEther(options.limit),
    parseEther(options.maxReward),
    parseEther(options.reward)
  );

  await deployBoost(core, budget, actionPayload, incentive);
})();
