# Boost Playground

A simple project to demonstrate how to deploy a Boost using the Boost SDK.

## Prerequisites

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
- This example runs on Base

## Running the Project

Start the development server:
```bash
pnpm dev
```

This will run the script and deploy the Boost.
