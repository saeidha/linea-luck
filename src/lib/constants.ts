export const LINEA_TOKEN_ADDRESS = '0x29380Ed69d0012E2Fa825B7ECC8751ebB21Aa79d';

// This is a placeholder address. In a real application, this would be the deployed contract address.
export const ATB_TOKEN_ADDRESS = '0x0000000000000000000000000000000000000001';

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
