export const LINEA_TOKEN_ADDRESS = '0x1789e0043623282D5DCc7F213d703C6D8BAfBB04';

// This is a placeholder address. In a real application, this would be the deployed contract address.
export const ATB_TOKEN_ADDRESS = process.env.NEXT_PUBLIC_ATB_TOKEN_ADDRESS || '0xCD12d603Ec87fB41a5F21EA2e1590470Dbe9F9CB';

export const LINEA_TOKEN_ABI = [
  {
    "constant": true,
    "inputs": [{ "name": "_owner", "type": "address" }],
    "name": "balanceOf",
    "outputs": [{ "name": "balance", "type": "uint256" }],
    "payable": false,
    "stateMutability": "view",
    "type": "function"
  }
] as const;

export const ATB_TOKEN_ABI = [
  {
    "inputs": [
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "claim",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;

export const DAILY_CLAIM_LIMIT = 20;

export const TRY_TO_LUCK_ABI = [
  {
    "inputs": [],
    "name": "tryClaimDailyReward",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  }
] as const;
