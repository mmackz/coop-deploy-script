# Deploy Sound.xyz Mint Incentives

A CLI tool for creating Sound.xyz mint boosts using Boost v2 SDK.

## Installation

- Node.js v18+
- pnpm

## Setup

1. Clone the repository
2. Install dependencies:
   ```bash
   pnpm install
   ```

3. Copy the environment file:
   ```bash
   cp .env.sample .env
   ```

4. Configure your environment variables in `.env`:
   - `ACCOUNT_1_KEY`: Your private key (must be permissioned to use the budget)
   - `BUDGET_ADDRESS`: The address of your ManagedBudget contract

## Important Notes

- The budget account (`BUDGET_ADDRESS`) must be authorized to the EOA associated with your private key
- The budget must be funded with the tokens you want to use for the Boost
- Only compatible with Base Network

## Usage

### Creating a Sound.xyz Mint Boost

```bash
pnpm deploy-boost [options]

Options:
  --collection, -c  The Sound.xyz collection contract address
  --asset, -a      Token address to be used as reward (must be 18 decimals *no USDC)
  --limit, -l      Total amount of tokens to distribute (in human readable format, e.g., "10000")
  --maxReward, -m  Maximum amount claimable per wallet (in human readable format, e.g., "420.69")
  --reward, -r     (Optional) Amount to reward per NFT mint (in human readable format, defaults to "0.000777")
```

### Parameters Explained

- **collection**: The contract address of the Sound.xyz NFT collection you want to create incentives for.

- **asset**: The token address that will be used as the reward. Must be an 18 decimal token:
  - ETH: `0x0000000000000000000000000000000000000000`
  - WETH or other 18 decimal ERC20 tokens
  - Note: Tokens like USDC (6 decimals) are not compatible

- **limit**: The total reward pool size in standard token units.
  For example, `1.5` means 1.5 ETH total reward pool.

- **maxReward**: The maximum amount that any single wallet can claim, in standard token units.
  For example, `0.1` means each wallet can claim up to 0.1 ETH.

- **reward**: (Optional) The amount to reward per NFT minted, in standard token units.
  - Defaults to `0.000777` if not specified
  - This covers 100% of the standard Sound.xyz mint cost

### Example Usage

```bash
# Using full option names
pnpm deploy-boost \
  --collection 0x1234...5678 \
  --asset 0x1234...5678 \
  --limit 1000 \
  --maxReward 100 \
  --reward 0.000777

# Or using shorthand notation
pnpm deploy-boost \
  -c 0x1234...5678 \
  -a 0x1234...5678 \
  -l 1000 \
  -m 100 \
  -r 0.000777
```

This example:
- Creates an incentive for the specified Sound.xyz collection
- Uses ETH as the reward token
- Limits a total reward pool of 1000 tokens
- Sets the max reward each wallet can claim to 100 tokens
- Rewards 0.000777 ETH worth of tokens per NFT minted

